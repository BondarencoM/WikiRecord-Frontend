import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RecommendationPageComponent } from './recommendation-page.component';

describe('RecommendationPageComponent', () => {
  let component: RecommendationPageComponent;
  let fixture: ComponentFixture<RecommendationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ RecommendationPageComponent ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
