import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddPersonaVM } from 'src/app/models/persona/AddPersonaVM';
import { WikiPersonVM } from 'src/app/models/persona/WikiPersonVM';
import { IWikiSearchResult } from 'src/app/models/wiki/IWikiSearchResult';
import { PersonasService } from 'src/app/services/personas.service';
import { WikibaseService } from 'src/app/services/wikibase.service';

@Component({
  selector: 'app-add-persona-page',
  templateUrl: './add-persona-page.component.html',
  styleUrls: ['./add-persona-page.component.css']
})
export class AddPersonaPageComponent implements OnInit {

  model = new WikiPersonVM()
  wikiModel: WikiPersonVM[]
  isLoading = false
  personaSubscription: Subscription

  constructor(
    private personasService: PersonasService,
    private wiki: WikibaseService,
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void{}

  updateSugestions(): void{
    this.startLoading()
    const wordSearch = this.model.name;
    setTimeout(async () => {
        if (this.searchStillRelevant(wordSearch)) {
          await this.populateSuggestions(wordSearch)
        }
    }, 300);
  }

  private startLoading(): void{
    this.wikiModel = []
    this.isLoading = true;
  }

  private endLoading = (): void => {this.isLoading = false}

  private searchStillRelevant(search: string): boolean{
    return this.model.name && search === this.model.name
  }

  private populateSuggestions(searchName: string): void{

    this.personaSubscription = this.wiki.GetSearchResults(searchName).subscribe({
      next: async (segment) => await this.AddDetailed(searchName, segment),
      error: console.error,
      complete: this.endLoading
    })
  }

  async AddDetailed(search: string, segment: IWikiSearchResult): Promise<void>{

    if (!segment.search || this.searchStillRelevant(search) === false) {
      return;
    }

    if (this.wikiModel.length > 25 ) {
      this.personaSubscription.unsubscribe()
    }

    const ids = segment.search.map(entity => entity.id)
    const entities = await this.wiki.GetEntitiesByIds(...ids)

    if (!entities || !this.searchStillRelevant(search)) {
      return;
    }

    const newElements = entities
            .filter(e => e.claims.P31  && e.claims.P31[0] === 'Q5')
            .map(e => new WikiPersonVM({
              wikiId: e.id,
              name: e.labels.en,
              description: e.descriptions.en,
              modified: e.modified
            }))
            .sort(WikiPersonVM.OrderByModifiedDateDesc)
    this.wikiModel.push(...newElements)

    if (this.wikiModel.length > 25 ) {
        this.personaSubscription.unsubscribe()
    }

  }

  addPersona(persona: WikiPersonVM): void{
    this.personasService.create(new AddPersonaVM(persona)).subscribe(r => console.log(r))
    this.wikiModel = this.wikiModel.filter( p => p !== persona )
  }

}


