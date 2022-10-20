import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment-service.service'
import { environment } from 'src/environments/environment'
import { Comment } from 'src/app/models/comment/Comment'

const COMMENT_BATCH = 10

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() entity: string

  @Input() domain: string

  @Input() entityId: string

  comments : Comment[] = []
  moreAvailable = true

  constructor(private commentService: CommentService) { }

  private get commentUrl(): string {
    return environment[this.domain + 'ServiceURL']
  }

  ngOnInit(): void {
    this.commentService.get(this.commentUrl, this.entityId, COMMENT_BATCH).subscribe({
      next: c => {
        this.comments = c
        this.moreAvailable = c.length >= COMMENT_BATCH 
      }
    })
  }

  onShowMore(): void {
    this.commentService.get(this.commentUrl, this.entityId, COMMENT_BATCH, this.comments?.length || 0).subscribe({
      next: c => {
        this.comments.push(...c)
        this.moreAvailable = c.length >= COMMENT_BATCH
      }
    })
  }

}
