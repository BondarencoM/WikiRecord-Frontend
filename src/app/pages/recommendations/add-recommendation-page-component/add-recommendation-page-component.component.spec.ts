import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecommendationPageComponentComponent } from './add-recommendation-page-component.component';

describe('AddRecommendationPageComponentComponent', () => {
  let component: AddRecommendationPageComponentComponent;
  let fixture: ComponentFixture<AddRecommendationPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecommendationPageComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecommendationPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
