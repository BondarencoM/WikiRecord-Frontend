import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recommendation } from '../models/Recommendation';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  readonly URL = environment.recommendationServiceURL;


  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Recommendation>{
    return this.http.get<Recommendation>(this.URL + '/' + id)
  }
}
