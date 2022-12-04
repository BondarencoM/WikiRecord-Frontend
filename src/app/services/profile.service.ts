import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { UserProfile } from '../models/profile/Profile'

const BASE_URL = environment.profileServiceURL;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor (private http: HttpClient) { }

  getByUsername(username: string) : Observable<UserProfile> {
    return this.http.get<UserProfile>(BASE_URL + '/' + username)
  }
}
