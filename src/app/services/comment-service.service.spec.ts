import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment-service.service';

describe('CommentServiceService', () => {
  let service: CommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    })
    .compileComponents();

    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
