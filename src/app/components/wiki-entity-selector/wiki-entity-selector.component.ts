import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { WikiInterestVM } from 'src/app/models/persona/WikiInterestVM';
import { WikiPersonVM } from 'src/app/models/persona/WikiPersonVM';
import { WikiSearchResult } from 'src/app/models/wiki/WikiSearchResult';
import { WikiSimplifiedEntityVM } from 'src/app/models/wiki/WikiSimplifiedEntityVM';
import { WikibaseService } from 'src/app/services/wikibase.service';

@Component({
  selector: 'app-wiki-entity-selector',
  templateUrl: './wiki-entity-selector.component.html',
  styleUrls: ['./wiki-entity-selector.component.css']
})
export class WikiEntitySelectorComponent<TModel> implements OnInit {

  searchQueryModel: string
  wikiModel: TModel[]
  isLoading = false
  entitiesSubscription: Subscription

  @Input() ModelMapper: (entity: WikiSimplifiedEntityVM) => TModel
  @Input() EntityFilter: (entity: WikiSimplifiedEntityVM) => boolean
  @Input() title = 'Select entity'

  @Output() EntitySelected = new EventEmitter<TModel>()

  constructor(private wiki: WikibaseService) { }

  ngOnInit(): void {
  }

  updateSugestions(): void{
    this.startLoading()
    const wordSearch = this.searchQueryModel;
    setTimeout(() => {
        if (this.searchStillRelevant(wordSearch)) {
          this.populateSuggestions(wordSearch)
        }
    }, 300);
  }

  private startLoading(): void{
    this.wikiModel = []
    this.isLoading = true;
  }

  private endLoading = (): void => {this.isLoading = false}

  private searchStillRelevant(search: string): boolean{
    return search && search === this.searchQueryModel
  }

  private populateSuggestions(searchName: string): void{

    this.entitiesSubscription = this.wiki.GetSearchResults(searchName).subscribe({
      next: async (segment) => await this.AddDetailed(searchName, segment),
      error: console.error,
      complete: this.endLoading
    })
  }

  async AddDetailed(search: string, segment: WikiSearchResult): Promise<void>{

    if (!segment.search || this.searchStillRelevant(search) === false) {
      return;
    }

    if (this.wikiModel.length > 25 ) {
      this.entitiesSubscription.unsubscribe()
    }

    const ids = segment.search.map(entity => entity.id)
    const entities = await this.wiki.GetEntitiesByIds(...ids)

    if (!entities || !this.searchStillRelevant(search)) {
      return;
    }

    const newElements = entities
            .filter(this.EntityFilter)
            .map(this.ModelMapper)
           // .sort(WikiPersonVM.OrderByModifiedDateDesc)
    this.wikiModel.push(...newElements)

    if (this.wikiModel.length > 25 ) {
      this.entitiesSubscription.unsubscribe()
    }
  }

  selectEntity(persona: TModel): void{
    this.EntitySelected.emit(persona)
  }

}
