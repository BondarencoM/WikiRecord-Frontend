import { Injectable } from '@angular/core';
import WBK from 'wikibase-sdk'

@Injectable({
  providedIn: 'root'
})

export class WikiSdkWrapperService {
  
  private wiki = WBK({
    instance: 'https://www.wikidata.org',
    sparqlEndpoint: 'https://query.wikidata.org/sparql'
  })

  searchEntities(options: IWikiSearchEntitiesOptions): string {
    return this.wiki.searchEntities(options)
  }

  getManyEntities(options: IWikiGetEntitiesOptions): string {
    return this.wiki.getManyEntities(options)[0]
  }

  simplifyEntities(entities: any): any{
    return this.wiki.simplify.entities(entities)
  }
}

export interface IWikiSearchEntitiesOptions{ 
  search: string; 
  language: string; 
  limit: number; 
  continue: number; 
}

export interface IWikiGetEntitiesOptions { 
  ids: string[];
  languages: string[];
  props: string[]; 
}
