import { HttpErrorResponse } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core';
import { AuthenticatedUser } from 'src/app/models/AuthenticatedUser'
import { Comment } from 'src/app/models/comment/Comment'
import { AuthService } from 'src/app/services/auth.service'
import { CommentService } from 'src/app/services/comment-service.service'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment

  disabled = false
  deleted = false
  errorMessage: string | null = null
  user: AuthenticatedUser

  constructor (
    private service: CommentService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getAuthenticatedeUser().then(user => this.user = user)
    this.authService.UserChanged.subscribe(user => this.user = user)
  }

  canEdit(): boolean {
    return this.user?.isLoggedIn() && this.user.claims.name === this.comment.username
  }

  async removeComment(): Promise<void> {
    try {
      this.disabled = true
      await this.service.delete(this.comment.id)
      this.deleted = true
    }
    catch (e) {
      if (e instanceof HttpErrorResponse) {
        console.log(e)
        if (e.status === 404) { this.errorMessage = 'Could not confirm deletion. Please try again later.' }
        if (e.status === 403) { this.errorMessage = 'You can\'t delete this.' }
        console.log(this.errorMessage)
      } else {
        this.disabled = false
      }
    }
  }
}
