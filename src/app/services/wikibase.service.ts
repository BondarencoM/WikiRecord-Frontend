import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import WBK from 'wikibase-sdk'
import { WikiEntity } from '../models/wiki/WikiEntity';
import { WikiProperties } from '../models/wiki/WikiProperties';
import { WikiSearchResult } from '../models/wiki/WikiSearchResult';
import { WikiSimplifiedEntityVM } from '../models/wiki/WikiSimplifiedEntityVM';


@Injectable({
  providedIn: 'root'
})
export class WikibaseService {

  private wiki = WBK({
    instance: 'https://www.wikidata.org',
    sparqlEndpoint: 'https://query.wikidata.org/sparql'
  })

  constructor(private http: HttpClient, ) { }

  GetSearchResults(searchName: string): Observable<WikiSearchResult>{
    return new Observable<WikiSearchResult>(
      subscriber => this.SearchAndPublishSegment(searchName, 0, subscriber)
      );
  }

  SearchAndPublishSegment(query: string, offset: number, subscriber: Subscriber<WikiSearchResult>): void{

    if (offset > 90 || offset === undefined || offset === null) {
      return subscriber.complete();
    }

    const searchQquery: string = this.wiki.searchEntities({
      search: query,
      language: 'en',
      limit: 20,
      continue: offset,
    })

    this.http.get<WikiSearchResult>(searchQquery).subscribe(
      response => {
        subscriber.next(response)
        this.SearchAndPublishSegment(query, response['search-continue'], subscriber)
      }
    )
  }



  async GetEntitiesByIds(...ids: string[]): Promise<WikiSimplifiedEntityVM[]>{

    if (!ids || ids.length === 0) { return; }

    const entitiesQuery: string = this.wiki.getManyEntities({
      ids,
      languages: ['en'],
      props: [ 'info', 'labels', 'claims', 'descriptions' ],
    })[0]

    const entitiesResponse = await this.http.get<WikiEntity>(entitiesQuery).toPromise()

    const entities = Object.values<WikiSimplifiedEntityVM>(this.wiki.simplify.entities(entitiesResponse.entities))

    return entities || []

  }
}
