import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, Input } from '@angular/core';
import { AddCommentVM } from 'src/app/models/comment/AddCommentVM'
import { CommentService } from 'src/app/services/comment-service.service'

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  @Input() domain: string

  @Input() entityId: string

  text = ''

  disabled = false
  errorMessage: string | null = null

  constructor (private commentService: CommentService) { }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    this.disabled = true

    try {

      const comment = new AddCommentVM({
        domain: this.domain,
        entityId: this.entityId,
        text: this.text,
      })
      await this.commentService.create(comment).toPromise()

    } catch (e) {
      console.log(e)
      if (e instanceof HttpErrorResponse) {
        if (e.status === 429) { this.errorMessage = 'You have posted too many comments.' }
        else { this.errorMessage = 'Soething went wrong. Try again later.' }
      }
      else { throw e }
    }
    finally {
      this.disabled = false
    }

    this.text = ''
  }

}
