import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AddCommentVM } from '../models/comment/AddCommentVM'
import { Comment } from '../models/comment/Comment'

const URL = environment.commentServiceURL

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor (private http: HttpClient) { }

  public create(model: AddCommentVM): Observable<Comment> {
    return this.http.post<Comment>(URL, model)
  }

  public getPage(api: string, id: string, limit = 10, skip = 0): Observable<Comment[]>  {
    return this.http.get<Comment[]>(`${api}/${id}/comments?limit=${limit}&skip=${skip}`)
  }

  public delete(id: number): Promise<void> {
    return this.http.delete<void>(URL + '/' + id).toPromise()
  }

  public edit(comment: Comment): Promise<void> {
    return this.http.put<void>(URL + '/' + comment.id, comment).toPromise()
  }
}
