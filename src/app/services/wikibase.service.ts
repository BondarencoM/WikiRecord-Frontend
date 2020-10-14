import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import WBK from 'wikibase-sdk'
import { WikiEntity } from '../models/wiki/WikiEntity';
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

  constructor(private http: HttpClient,) { }

  async GetSearchResults(searchName: string): Promise<WikiSearchResult>{  
    const searchQquery : string = this.wiki.searchEntities({
      search: searchName,
      language: 'en',
      limit: 45,
    })

    return await this.http.get<WikiSearchResult>(searchQquery).toPromise()
  }

  async GetEntitiesByIds(...ids: string[]): Promise<WikiSimplifiedEntityVM[]>{
    if(!ids || ids.length == 0) return;

    let entitiesQuery : string = this.wiki.getManyEntities({
      ids, 
      languages: ['en'],
      props: [ 'info', 'labels', 'claims', 'descriptions' ],
    })[0]

    let entitiesResponse = await this.http.get<WikiEntity>(entitiesQuery).toPromise()
    
    let entities = Object.values<WikiSimplifiedEntityVM>(this.wiki.simplify.entities(entitiesResponse.entities))

    return entities || []

  }

}
