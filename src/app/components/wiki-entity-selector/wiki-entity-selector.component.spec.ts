import { HttpClientTestingModule  } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { WikibaseService } from 'src/app/services/wikibase.service';
import { cold } from 'jasmine-marbles'
import { IWikiSearchResult } from 'src/app/models/wiki/IWikiSearchResult'
import { WikiEntitySelectorComponent } from './wiki-entity-selector.component';
import { FormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { IWikiSimplifiedEntityVM } from 'src/app/models/wiki/WikiSimplifiedEntityVM';

fdescribe('WikiEntitySelectorComponent', () => {
  let component: WikiEntitySelectorComponent<unknown>
  let fixture: ComponentFixture<WikiEntitySelectorComponent<unknown>>
  let wikiSpy: jasmine.SpyObj<WikibaseService>
  let mapperSpy: jasmine.Spy<(entity: IWikiSimplifiedEntityVM) => unknown>
  let filterSpy: jasmine.Spy<(entity: IWikiSimplifiedEntityVM) => boolean>
  let element: HTMLElement


  beforeEach(async () => {
    wikiSpy = jasmine.createSpyObj<WikibaseService>(['GetSearchResults', 'GetEntitiesByIds']);
    mapperSpy = jasmine.createSpy()
    filterSpy = jasmine.createSpy()

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      providers: [{provide: WikibaseService, useValue: wikiSpy}],
      declarations: [ WikiEntitySelectorComponent, LoadingIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WikiEntitySelectorComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement as HTMLElement

    component.ModelMapper = mapperSpy
    component.EntityFilter = filterSpy
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  const searchResults = {
    a: { search: [
      {id: 'Q5000', label: 'Name 1', description: ''},
      {id: 'Q5001', label: 'Name 2', description: ''},
      {id: 'Q5002', label: 'Name 3', description: ''},
     ]} as IWikiSearchResult,
    b: { search: [
    {id: 'Q6000', label: 'Name 5', description: ''},
    {id: 'Q6001', label: 'Name 6', description: ''},
    {id: 'Q6002', label: 'Name 7', description: ''},
    ]} as IWikiSearchResult,
    c: { search: [
    {id: 'Q7000', label: 'Name 9', description: ''},
    {id: 'Q7001', label: 'Name 10', description: ''},
    {id: 'Q7002', label: 'Name 11', description: ''},
    ]} as IWikiSearchResult,
  }

  it('should search for inputed values', fakeAsync(() => {
    wikiSpy.GetSearchResults.and.returnValue(cold('a-(b|)', searchResults))
    wikiSpy.GetEntitiesByIds
    .and.resolveTo(searchResults.a.search.map(s => ({id: s.id})) as IWikiSimplifiedEntityVM[])
    .and.resolveTo(searchResults.b.search.map(s => ({id: s.id})) as IWikiSimplifiedEntityVM[])

    mapperSpy.and.callFake(e => ({id: e.id}))
    filterSpy.and.callFake(() => true)

    component.ngOnInit()

    const input = element.querySelector('input[name=name]') as HTMLInputElement
    input.value = 'Till Lindemann'
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges()
    expect(element.textContent).toMatch(/loading/i)

    tick(500) // simulate 500 ms passing by

    expect(wikiSpy.GetSearchResults).toHaveBeenCalledWith('Till Lindemann');


  }))
});
