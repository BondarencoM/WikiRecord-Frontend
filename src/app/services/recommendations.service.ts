import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recommendation } from '../models/recommendations/Recommendation';
import { CreateRecommendationVM } from '../models/recommendations/CreateRecommendationVM';

const BASE_URL = environment.recommendationServiceURL;

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor (private http: HttpClient) { }

  getById(id: number): Observable<Recommendation>{
    return this.http.get<Recommendation>(BASE_URL + '/' + id)
  }

  createAndObserveResponse(model: CreateRecommendationVM): Observable<HttpResponse<Recommendation>>{
    return this.http.post<Recommendation>(BASE_URL, model, {observe: 'response'})
  }
}
