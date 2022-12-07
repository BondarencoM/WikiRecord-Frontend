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

  comments: Comment[] | null = null
  moreAvailable = true

  constructor (private commentService: CommentService) { }

  private get commentUrl(): string {
    return environment[this.domain + 'ServiceURL']
  }

  async ngOnInit(): Promise<void> {
    this.comments = await this.commentService.getPage(this.commentUrl, this.entityId, COMMENT_BATCH).toPromise()
    this.moreAvailable = this.comments.length >= COMMENT_BATCH
  }

  async onShowMore(): Promise<void> {
    const comments = await this.commentService.getPage(this.commentUrl, this.entityId, COMMENT_BATCH, this.comments?.length || 0).toPromise()
        this.comments.push(...comments)
        this.moreAvailable = comments.length >= COMMENT_BATCH
  }
}
