import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WikiEntitySelectorComponent } from 'src/app/components/wiki-entity-selector/wiki-entity-selector.component';
import { Interest } from 'src/app/models/interest/Interest';
import { Persona } from 'src/app/models/persona/Persona';
import { WikiInterestVM } from 'src/app/models/persona/WikiInterestVM';
import { WikiPersonVM } from 'src/app/models/persona/WikiPersonVM';
import { CreateRecommendationVM } from 'src/app/models/recommendations/CreateRecommendationVM';
import { Recommendation } from 'src/app/models/recommendations/Recommendation';
import { InterestsService } from 'src/app/services/interests-service.service';
import { PersonasService } from 'src/app/services/personas.service';
import { RecommendationsService } from 'src/app/services/recommendations.service';

@Component({
  selector: 'app-add-recommendation-page-component',
  templateUrl: './add-recommendation-page-component.component.html',
  styleUrls: ['./add-recommendation-page-component.component.css']
})
export class AddRecommendationPageComponentComponent implements OnInit {

  @ViewChild('PersonaSelectionForm') PersonaSelectionForm: WikiEntitySelectorComponent<WikiPersonVM>
  @ViewChild('InterestSelectionForm') InterestSelectionForm: WikiEntitySelectorComponent<WikiInterestVM>
  @ViewChild('submitForm') submitForm: FormGroup

  stages = FormStage
  stage =  0 as FormStage

  model = new CreateRecommendationVM()
  persona : Persona = null
  interest : Interest = null
  
  constructor(
    private service: RecommendationsService,
    private personasService: PersonasService,
    private interestsService: InterestsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  personaSelected(persona: WikiPersonVM): void {
    this.personasService.create(persona).subscribe(persona => {
      this.persona = Persona.AttachMethods(persona) 
      this.model.personaId = persona.id
      console.log(persona)
    })

    this.nextStage()
  }

  interestSelected(interest: WikiInterestVM): void {
    this.interestsService.create(interest).subscribe( interest => {
      this.interest = Interest.AttachMethods(interest)
      this.model.interestId = interest.id
      console.log(interest)
    })

    this.nextStage()
  }

  addRecommendation(): void{
    const currentPage = window.location.href

    this.service.createAndObserveResponse(this.model).subscribe({
      next: (response: HttpResponse<Recommendation>) => {
        if (currentPage === window.location.href){
          this.router.navigate(['recommendations', response.body.id])
        }
        switch (response.status){
          case 200:
            console.log('recommendation already existed')
            break
          case 201:
            console.log('new recommendation created')
        }
      }
    })
    this.nextStage()
  }

  private nextStage(): void{
    this.stage = (this.stage + 1) % (Object.values(this.stages).length / 2)
  }

  get PersonaModelMapper() { return WikiPersonVM.PersonaModelMapper}
  get PersonaEntityFilter() { return WikiPersonVM.PersonaEntityFilter}
  get InterestModelMapper() { return WikiInterestVM.InterestModelMapper}
  get InterestEntityFilter() { return WikiInterestVM.InterestEntityFilter}

}

enum FormStage {
  SelectPersona,
  SelectInterest,
  Register,
  Loading
}
