import { TestBed } from '@angular/core/testing';

import { InterestsService } from './interests-service.service';

describe('InterestsServiceService', () => {
  let service: InterestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
