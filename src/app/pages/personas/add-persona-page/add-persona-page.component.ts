import { Component, OnInit } from '@angular/core';
import { AddPersonaVM } from 'src/app/models/persona/AddPersonaVM';
import { WikiPersonVM } from 'src/app/models/persona/WikiPersonVM';
import { PersonasService } from 'src/app/services/personas.service';
import { WikibaseService } from 'src/app/services/wikibase.service';

@Component({
  selector: 'app-add-persona-page',
  templateUrl: './add-persona-page.component.html',
  styleUrls: ['./add-persona-page.component.css']
})
export class AddPersonaPageComponent implements OnInit {

  model = new AddPersonaVM()
  wikiModel: WikiPersonVM[]

  constructor(
    private personasService: PersonasService,
    private wiki: WikibaseService,
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void{}

  updateSugestions(): void{
    let wordSearch = this.model.name;
    setTimeout(async () => {
        if (this.searchStillRelevant(wordSearch)) {
          await this.populateSuggestions(wordSearch)
        }
    }, 300);
  }

  private searchStillRelevant(search: string){
    return this.model.name && search == this.model.name
  }

  private async populateSuggestions(searchName: string): Promise<void>{    

    let searchResult = await this.wiki.GetSearchResults(searchName)
    
    if(this.searchStillRelevant(searchName) == false) 
      return;

    let ids = searchResult.search.map(entity => entity.id)
    let entities = await this.wiki.GetEntitiesByIds(...ids)

    if (!this.searchStillRelevant(searchName))
      return;

    this.wikiModel = entities
            .filter(e => (e.claims.P31[0] || "") === "Q5")
            .map(e => new WikiPersonVM({
              wikiId: e.id,
              name: e.labels.en,
              description: e.descriptions.en,
              modified: e.modified
            }))
            .sort(WikiPersonVM.OrderByModifiedDateDesc)
  }

  addPersona(persona: WikiPersonVM){
    this.personasService.create(new AddPersonaVM(persona)).subscribe(r => console.log(r))
    this.wikiModel = this.wikiModel.filter( p => p!== persona )
  }

}


