import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AddRecommendationPageComponent } from './add-recommendation-page-component.component';

describe('AddRecommendationPageComponentComponent', () => {
  let component: AddRecommendationPageComponent;
  let fixture: ComponentFixture<AddRecommendationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ AddRecommendationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecommendationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
