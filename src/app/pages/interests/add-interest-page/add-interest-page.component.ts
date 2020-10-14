import { Component, OnInit } from '@angular/core';
import { Interest } from 'src/app/models/Interest';
import { WikiInterestVM } from 'src/app/models/persona/WikiInterestVM';
import { WikiIdentifier } from 'src/app/models/wiki/WikiIdentifier';
import { WikiSimplifiedEntityVM } from 'src/app/models/wiki/WikiSimplifiedEntityVM';
import { WikibaseService } from 'src/app/services/wikibase.service';

@Component({
  selector: 'app-add-interest-page',
  templateUrl: './add-interest-page.component.html',
  styleUrls: ['./add-interest-page.component.css']
})
export class AddInterestPageComponent implements OnInit {

  model = new Interest()

  wikiModel: WikiInterestVM[]

  private AcceptedInterestsTypes = [
    WikiIdentifier.LiteraryWork,
    WikiIdentifier.Novel,
    WikiIdentifier.Poem,
    WikiIdentifier.ShortStory,
  ].map(e => e.toString())

  constructor(
    private wiki: WikibaseService,
  ) { }

  ngOnInit(): void {
  }

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

    if (!entities || !this.searchStillRelevant(searchName))
      return;

    this.wikiModel = entities
            .filter(e => this.EntityIsInterest(e))
            .map(e => new WikiInterestVM({
              wikiId: e.id,
              name: e.labels.en,
              description: e.descriptions.en,
              modified: e.modified
            }))
            .sort(WikiInterestVM.OrderByModifiedDateDesc)
  }

  private EntityIsInterest(entity: WikiSimplifiedEntityVM){
    let type = entity.claims.P31 || ["undefined"]
    return this.AcceptedInterestsTypes.includes(type[0])
  }

  addinterest(){

  }
}
