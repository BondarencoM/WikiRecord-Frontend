import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { WikiEntity } from '../models/wiki/WikiEntity';
import { IWikiSearchResult } from '../models/wiki/IWikiSearchResult';
import { IWikiSimplifiedEntityVM } from '../models/wiki/WikiSimplifiedEntityVM';
import { WikiSdkWrapperService } from './wiki-sdk-wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class WikibaseService {

  constructor(
    private http: HttpClient,
    private wiki: WikiSdkWrapperService,
    ) { }

  GetSearchResults(searchName: string): Observable<IWikiSearchResult>{
    return new Observable<IWikiSearchResult>(
      subscriber => this.SearchAndPublishSegment(searchName, 0, subscriber)
      );
  }

  private SearchAndPublishSegment(query: string, offset: number, subscriber: Subscriber<IWikiSearchResult>): void{

    if (offset > 90 || offset === undefined || offset === null) {
      return subscriber.complete();
    }

    const searchQquery: string = this.wiki.searchEntities({
      search: query,
      language: 'en',
      limit: 20,
      continue: offset,
    })

    this.http.get<IWikiSearchResult>(searchQquery).subscribe(
      response => {
        subscriber.next(response)
        this.SearchAndPublishSegment(query, response['search-continue'], subscriber)
      },
      error => subscriber.error(error)
    )
  }

  async GetEntitiesByIds(...ids: string[]): Promise<IWikiSimplifiedEntityVM[]>{

    if (!ids || ids.length === 0) { return Promise.resolve([]) }

    const entitiesQuery: string = this.wiki.getManyEntities({
      ids,
      languages: ['en'],
      props: [ 'info', 'labels', 'claims', 'descriptions' ],
    })

    const entitiesResponse = await this.http.get<WikiEntity>(entitiesQuery).toPromise()

    const entities = Object.values<IWikiSimplifiedEntityVM>(this.wiki.simplifyEntities(entitiesResponse.entities))

    return entities || []
  }
}
