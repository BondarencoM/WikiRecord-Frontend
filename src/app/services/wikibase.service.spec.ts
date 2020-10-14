import { TestBed } from '@angular/core/testing';

import { WikibaseService } from './wikibase.service';

describe('WikibaseService', () => {
  let service: WikibaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikibaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
