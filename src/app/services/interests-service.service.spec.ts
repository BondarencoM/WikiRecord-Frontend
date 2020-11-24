import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WikiEntitySelectorComponent } from '../components/wiki-entity-selector/wiki-entity-selector.component';

import { InterestsService } from './interests-service.service';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [HttpClientTestingModule ],
    declarations: [ WikiEntitySelectorComponent ]
  })
  .compileComponents();
});

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
