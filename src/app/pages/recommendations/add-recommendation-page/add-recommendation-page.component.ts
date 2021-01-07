import { HttpResponse } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { WikiEntitySelectorComponent } from 'src/app/components/wiki-entity-selector/wiki-entity-selector.component'
import { Interest } from 'src/app/models/interest/Interest'
import { Persona } from 'src/app/models/persona/Persona'
import { AcceptedInterestsTypes, WikiInterestVM } from 'src/app/models/interest/WikiInterestVM'
import { WikiPersonVM } from 'src/app/models/persona/WikiPersonVM'
import { CreateRecommendationVM } from 'src/app/models/recommendations/CreateRecommendationVM'
import { Recommendation } from 'src/app/models/recommendations/Recommendation'
import { WikiIdentifier } from 'src/app/models/wiki/WikiIdentifier'
import { InterestsService } from 'src/app/services/interests-service.service'
import { PersonasService } from 'src/app/services/personas.service'
import { RecommendationsService } from 'src/app/services/recommendations.service'
import { Images } from 'src/app/utils/Images'

@Component({
  selector: 'app-add-recommendation-page',
  templateUrl: './add-recommendation-page.component.html',
  styleUrls: ['./add-recommendation-page.component.css']
})
export class AddRecommendationPageComponent implements OnInit {

  @ViewChild('PersonaSelectionForm') PersonaSelectionForm: WikiEntitySelectorComponent<WikiPersonVM>
  @ViewChild('InterestSelectionForm') InterestSelectionForm: WikiEntitySelectorComponent<WikiInterestVM>
  @ViewChild('submitForm') submitForm: FormGroup

  model = new CreateRecommendationVM()
  persona: Persona = null
  interest: Interest = null

  HEART_IMAGE = Images.RedHeart

  constructor (
    private service: RecommendationsService,
    private personasService: PersonasService,
    private interestsService: InterestsService,
    private router: Router,
  ) {
    const nav = this.router.getCurrentNavigation()
    if (nav && nav.extras.state) {
      this.persona = nav.extras.state.persona
      this.model.personaId = this.persona.id
    }
  }

  ngOnInit(): void { }

  personaSelected(model: WikiPersonVM): void {

    this.persona = new Persona({
      name: model.name,
      imageUri: model.getImageUri()
    })

    this.personasService.create(model).subscribe(persona => {
      this.persona = Persona.AttachMethods(persona)
      this.model.personaId = persona.id
    })
  }

  interestSelected(model: WikiInterestVM): void {
    this.interest = new Interest({
      name: model.name,
      type: AcceptedInterestsTypes[model.instanceOf]
    })

    this.interestsService.create(model).subscribe(interest => {
      this.interest = Interest.AttachMethods(interest)
      this.model.interestId = interest.id
    })

  }

  addRecommendation(): void {
    const currentPage = window.location.href

    this.service.createAndObserveResponse(this.model).subscribe({
      next: (response: HttpResponse<Recommendation>) => {
        if (currentPage === window.location.href) {
          this.router.navigate(['recommendations', response.body.id])
        }
        switch (response.status) {
          case 200:
            console.log('recommendation already existed')
            break
          case 201:
            console.log('new recommendation created')
        }
      }
    })
  }

  get PersonaModelMapper(): any { return WikiPersonVM.PersonaModelMapper }
  get PersonaEntityFilter(): any { return WikiPersonVM.PersonaEntityFilter }
  get InterestModelMapper(): any { return WikiInterestVM.InterestModelMapper }
  get InterestEntityFilter(): any { return WikiInterestVM.InterestEntityFilter }

}
