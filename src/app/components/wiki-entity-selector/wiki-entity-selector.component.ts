import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { IWikiSearchResult } from 'src/app/models/wiki/IWikiSearchResult'
import { IWikiSimplifiedEntityVM } from 'src/app/models/wiki/WikiSimplifiedEntityVM'
import { WikibaseService } from 'src/app/services/wikibase.service'

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

  @Input() ModelMapper: (entity: IWikiSimplifiedEntityVM) => TModel
  @Input() EntityFilter: (entity: IWikiSimplifiedEntityVM) => boolean
  @Input() title = 'Select entity'

  @Output() EntitySelected = new EventEmitter<TModel>()

  constructor (private wiki: WikibaseService) { }

  ngOnInit(): void { }

  updateSugestions(): void {
    this.startLoading()
    const wordSearch = this.searchQueryModel

    setTimeout(() => {
      if (this.searchIsOutdated(wordSearch) === false) {
        this.populateSuggestions(wordSearch)
      }
    }, 300)
  }

  private startLoading(): void {
    this.wikiModel = []
    this.isLoading = true
  }

  private endLoading = (): void => { this.isLoading = false }

  private searchIsOutdated(search: string): boolean {
    return !search || search !== this.searchQueryModel
  }

  private populateSuggestions(searchName: string): void {

    this.entitiesSubscription = this.wiki.GetSearchResults(searchName).subscribe({
      next: async (segment) => await this.AddDetailed(searchName, segment),
      error: console.error,
      complete: this.endLoading
    })
  }

  async AddDetailed(search: string, segment: IWikiSearchResult): Promise<void> {

    if (!segment.search || this.searchIsOutdated(search)) {
      return
    }

    if (this.wikiModel.length > 25) {
      this.entitiesSubscription.unsubscribe()
    }

    const ids = segment.search.map(entity => entity.id)
    const entities = await this.wiki.GetEntitiesByIds(...ids)
    if (!entities || this.searchIsOutdated(search)) {
      return
    }
    const newElements = entities
      .filter(this.EntityFilter)
      .map(this.ModelMapper)
    // .sort(WikiPersonVM.OrderByModifiedDateDesc)
    this.wikiModel.push(...newElements)

    if (this.wikiModel.length > 25) {
      this.entitiesSubscription.unsubscribe()
    }
  }

  selectEntity(persona: TModel): void {
    this.EntitySelected.emit(persona)
  }

}
