import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateInterestVM } from 'src/app/models/interest/CreateInterestVM';
import { Interest } from 'src/app/models/interest/Interest';
import { WikiInterestVM } from 'src/app/models/interest/WikiInterestVM';
import { IWikiSearchResult } from 'src/app/models/wiki/IWikiSearchResult';
import { IWikiSimplifiedEntityVM } from 'src/app/models/wiki/WikiSimplifiedEntityVM';
import { InterestsService } from 'src/app/services/interests-service.service';
import { WikibaseService } from 'src/app/services/wikibase.service';

@Component({
  selector: 'app-add-interest-page',
  templateUrl: './add-interest-page.component.html',
  styleUrls: ['./add-interest-page.component.css']
})
export class AddInterestPageComponent implements OnInit {

  model = new Interest()

  wikiModel: WikiInterestVM[]
  isLoading = false
  interestSubscription: Subscription

  constructor(
    private wiki: WikibaseService,
    private service: InterestsService
  ) { }

  ngOnInit(): void {
  }

  updateSugestions(): void{
    this.startLoading()
    const wordSearch = this.model.name;
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
    return this.model.name && search === this.model.name
  }

  private populateSuggestions(searchName: string): void{
    this.interestSubscription = this.wiki.GetSearchResults(searchName).subscribe({
      next: async (segment) => await this.AddDetailed(searchName, segment),
      error: console.error,
      complete: this.endLoading,
    })
  }

  async AddDetailed(search: string, segment: IWikiSearchResult): Promise<void>{
    if (this.searchStillRelevant(search) === false) {
      return;
    }

    const ids = segment.search.map(entity => entity.id)
    const entities = await this.wiki.GetEntitiesByIds(...ids)

    if (!entities || !this.searchStillRelevant(search)) {
      return;
    }

    const newElements = entities
          .filter(WikiInterestVM.InterestEntityFilter)
          .map(WikiInterestVM.InterestModelMapper)
          .sort(WikiInterestVM.OrderByModifiedDateDesc)
    this.wikiModel.push(...newElements)

  }

  addInterest(interest: WikiInterestVM): void{
    this.service.create(new CreateInterestVM(interest)).subscribe(console.log)
    this.wikiModel = this.wikiModel.filter( i => i !== interest )
  }
}
