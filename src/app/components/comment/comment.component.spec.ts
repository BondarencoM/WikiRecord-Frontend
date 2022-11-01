import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Comment } from 'src/app/models/comment/Comment'

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = new Comment({ text: 'some coment', createdAt: new Date() })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
