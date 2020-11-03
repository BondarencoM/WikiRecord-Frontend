import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of, zip } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { expectToFailWith, expectSuccessWith, expectToFailWithHttpErrorEvent } from 'src/test/utils/utils';
import { WikiSearchResult } from '../models/wiki/WikiSearchResult';
import { WikiSimplifiedEntityVM } from '../models/wiki/WikiSimplifiedEntityVM';
import { IWikiGetEntitiesOptions, IWikiSearchEntitiesOptions, WikiSdkWrapperService } from './wiki-sdk-wrapper.service';
import { WikibaseService } from './wikibase.service';

describe('WikibaseService', () => {

  let service: WikibaseService
  let wikiSdkSpy: jasmine.SpyObj<WikiSdkWrapperService>
  let httpMock: HttpTestingController;

  beforeEach(() => {

    wikiSdkSpy = jasmine.createSpyObj<WikiSdkWrapperService>('WikiSdkWrapperService', ['searchEntities', 'getManyEntities', 'simplifyEntities'], );

    TestBed.configureTestingModule({
      providers: [
        HttpClientTestingModule,
        { provide: WikiSdkWrapperService, useValue: wikiSdkSpy },
      ]
    })

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WikibaseService);
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('GetSearchResults', () => {

    const searchEntitiesUrl = 'someUrlToSearchEntities'

    it('should emmit only once if there is one page of results', () => {

      const searchName = 'Testing name'
      const searchSpy = wikiSdkSpy.searchEntities.and.returnValue(searchEntitiesUrl)

      const searchResult = {
        search: [
          {id: 'Q18032000', label: searchName, description: ''},
          {id: 'Q18032001', label: searchName, description: ''},
          {id: 'Q18032002', label: searchName, description: ''},
        ]
      } as WikiSearchResult

      service.GetSearchResults(searchName).subscribe(expectSuccessWith(searchResult))

      expect(searchSpy).toHaveBeenCalledWith({
        search: searchName,
        continue: 0,
        limit: jasmine.any(Number) as any,
        language: jasmine.any(String) as any,
      })
      expect(searchSpy).toHaveBeenCalledTimes(1)

      const req = httpMock.expectOne(searchEntitiesUrl)

      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.has('Authorization')).toBeFalse()

      req.flush(searchResult)
    })

    it('should emmit every page of results', () => {

      const searchName = 'Testing name'
      const searchSpy = wikiSdkSpy.searchEntities.and.returnValue(searchEntitiesUrl)

      const searchResults = [
        {search: [], 'search-continue': 20},
        {search: [], 'search-continue': 40},
        {search: [], 'search-continue': 60},
        {search: [] },
      ] as WikiSearchResult[]

      service.GetSearchResults(searchName).pipe(toArray()).subscribe(expectSuccessWith(searchResults))

      for (let i = 0; i < 4; i++) {

        const expectedSearch = {
          search: searchName,
          continue: i * 20,
          limit: jasmine.any(Number) as any,
          language: jasmine.any(String) as any,
        }
        expect(searchSpy).toHaveBeenCalledWith(expectedSearch)

        const result = searchResults[i]
        const req = httpMock.expectOne(searchEntitiesUrl)
        expect(req.request.method).toEqual('GET');
        expect(req.request.headers.has('Authorization')).toBeFalse()
        req.flush(result)
      }
    })

    it('should propagate error', () => {

      const searchName = 'Testing name'
      wikiSdkSpy.searchEntities.and.returnValue(searchEntitiesUrl)

      const error = new ErrorEvent('Network error', {
        message: 'Something went wrong with the network'
      })

      service.GetSearchResults(searchName).subscribe(expectToFailWithHttpErrorEvent(error))

      const req = httpMock.expectOne(searchEntitiesUrl)

      req.error(error)
    })
  })

  describe('GetEntitiesByIds', () => {

    const sampleIds = ['Q101', 'Q102', 'Q103']
    const getEntitesUrl = 'SomeUrlToGetEntities'


    it('should get entities for all IDs', waitForAsync(() => {

      const sampleRawEntites = { isRealObject: 'No, doesn\'t have to be like the real object'}
      const finalEnties = [{
        id: 'Q101',
        labels: { en : 'someLabels'},
      }] as WikiSimplifiedEntityVM[]

      const getEntitiesSpy = wikiSdkSpy.getManyEntities.and.returnValue(getEntitesUrl)

      const simplifySpy = wikiSdkSpy.simplifyEntities.and.returnValue(finalEnties)

      service.GetEntitiesByIds(...sampleIds).then(
        result => {
          expect(getEntitiesSpy).toHaveBeenCalledWith({
            ids : sampleIds,
            languages: jasmine.any(Array) as any,
            props: jasmine.any(Array)as any,
          })
          expect(simplifySpy).toHaveBeenCalledWith(sampleRawEntites)
          expect(result).toEqual(finalEnties)
      })

      const req = httpMock.expectOne(getEntitesUrl)
      expect(req.request.method).toEqual('GET');
      expect(req.request.headers.has('Authorization')).toBeFalse()
      req.flush({entities: sampleRawEntites})

    }))

    it('should resolve to empty array if there are no IDs', waitForAsync(() => {
      service.GetEntitiesByIds().then( result => expect(result).toEqual([]))
    }))
  })
});
