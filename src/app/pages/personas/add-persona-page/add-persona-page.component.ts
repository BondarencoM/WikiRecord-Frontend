import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AddPersonaVM } from 'src/app/models/persona/AddPersonaVM';
import { WikiEntity } from 'src/app/models/persona/wiki/WikiEntity';
import { WikiPersonVM } from 'src/app/models/persona/wiki/WikiPersonVM';
import { WikiSearchResult } from 'src/app/models/persona/wiki/WikiSearchResult';
import { WikiSimplifiedPersonaVM } from 'src/app/models/persona/wiki/WikiSimplifiedPersona';
import { PersonasService } from 'src/app/services/personas.service';
import WBK from 'wikibase-sdk'

@Component({
  selector: 'app-add-persona-page',
  templateUrl: './add-persona-page.component.html',
  styleUrls: ['./add-persona-page.component.css']
})
export class AddPersonaPageComponent implements OnInit {

  model = new AddPersonaVM()
  wikiModel: WikiPersonVM[]

  wiki = WBK({
    instance: 'https://www.wikidata.org',
    sparqlEndpoint: 'https://query.wikidata.org/sparql'
  })


  constructor(
    private personasService: PersonasService,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void{}

  updateSugestions(): void{

    let wordSearch = this.model.name;
    setTimeout(async () => {
        if (this.model.name && wordSearch == this.model.name) {
          await this.populateSuggestions(wordSearch)
        }
    }, 300);
  }

  private async populateSuggestions(searchName: string): Promise<void>{    
    const searchQquery : string = this.wiki.searchEntities({
      search: searchName,
      language: 'en',
      limit: 45,
    })

    const result = await this.http.get<WikiSearchResult>(searchQquery).toPromise()
      
    if (searchName !== this.model.name){
      return;
    }

    let ids = result.search.map(entity => entity.id)

    if(!ids || ids.length == 0) return;

    let entitiesQuery : string = this.wiki.getManyEntities({
      ids, 
      languages: ['en'],
      props: [ 'info', 'labels', 'claims', 'descriptions' ],
    })[0]

    let entitiesResponse = await this.http.get<WikiEntity>(entitiesQuery).toPromise()
    
    let entities = Object.values<WikiSimplifiedPersonaVM>(this.wiki.simplify.entities(entitiesResponse.entities))
    
    if (searchName == this.model.name){
      this.wikiModel = entities
        .filter(e => (e.claims.P31 || "") == "Q5")
        .map(e => new WikiPersonVM({
          wikiId: e.id,
          name: e.labels.en,
          description: e.descriptions.en,
          modified: e.modified
        }))
        .sort(WikiPersonVM.OrderByModifiedDateDesc)
    }
  }

  addPersona(persona: WikiPersonVM){
    this.personasService.create(new AddPersonaVM(persona)).subscribe(r => console.log(r))
    this.wikiModel = this.wikiModel.filter( p => p!== persona )
  }

}


