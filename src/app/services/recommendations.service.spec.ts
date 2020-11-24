import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RecommendationsService } from './recommendations.service';

describe('RecommendationsService', () => {
  let service: RecommendationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
    service = TestBed.inject(RecommendationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
