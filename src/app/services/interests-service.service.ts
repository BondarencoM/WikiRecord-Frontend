import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateInterestVM } from '../models/interest/CreateInterestVM';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Interest } from '../models/interest/Interest';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  baseUrl = environment.interestServiceURL

  constructor(private http: HttpClient) { }

  create(interest: CreateInterestVM): Observable<Interest>{
    return this.http.post<Interest>(this.baseUrl, interest)
  }

}
