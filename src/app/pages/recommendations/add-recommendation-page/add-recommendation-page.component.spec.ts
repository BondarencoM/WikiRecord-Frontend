import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InterestsService } from 'src/app/services/interests-service.service';
import { PersonasService } from 'src/app/services/personas.service';
import { RecommendationsService } from 'src/app/services/recommendations.service';

import { AddRecommendationPageComponent } from './add-recommendation-page.component';

describe('AddRecommendationPageComponent', () => {
  let component: AddRecommendationPageComponent;
  let fixture: ComponentFixture<AddRecommendationPageComponent>;

  let personasSpy = jasmine.createSpyObj<PersonasService>(['create'] );
  let interestsSpy = jasmine.createSpyObj<InterestsService>(['create'] );
  let recommendationSpy = jasmine.createSpyObj<RecommendationsService>(['createAndObserveResponse']);
  let routerSpy = jasmine.createSpyObj<Router>(['getCurrentNavigation']);


  beforeEach(async () => {

    routerSpy.getCurrentNavigation.and.returnValue(null)

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ AddRecommendationPageComponent ],
      providers: [
        { provide: PersonasService, useValue: personasSpy },
        { provide: InterestsService, useValue: interestsSpy },
        { provide: RecommendationsService, useValue: recommendationSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecommendationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })


  it('', () => {

  })

})
