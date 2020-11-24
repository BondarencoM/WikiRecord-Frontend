import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WikiEntitySelectorComponent } from '../components/wiki-entity-selector/wiki-entity-selector.component';

import { InterestsService } from './interests-service.service';

describe('InterestsServiceService', () => {

  let service: InterestsService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      declarations: [ WikiEntitySelectorComponent ]
    })
    .compileComponents();
    service = TestBed.inject(InterestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
