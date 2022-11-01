import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment/Comment'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment

  constructor () { }

  ngOnInit(): void {
  }

}
