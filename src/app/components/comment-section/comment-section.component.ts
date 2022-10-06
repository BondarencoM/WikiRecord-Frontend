import { Component, OnInit, Input } from '@angular/core';
import { AddCommentVM } from 'src/app/models/comment/AddCommentVM'
import { CommentService } from 'src/app/services/comment-service.service'

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() domain: string

  @Input() entityId: string

  text = ''

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  async submit() {
    console.log(this.text)

    await this.commentService.create(new AddCommentVM({
      domain: this.domain,
      entityId: this.entityId,
      text: this.text,
    })).toPromise()

    this.text = ""
  }

}
