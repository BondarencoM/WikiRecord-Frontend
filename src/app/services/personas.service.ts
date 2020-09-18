import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DiscoverPersonaViewModel } from '../models/DiscoverPersonaViewModel';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  readonly URL = environment.personasServiceURL;


  constructor(private http: HttpClient) { }

  getRecommendedPersonas(): Observable<DiscoverPersonaViewModel[]>{
    return this.http.get<DiscoverPersonaViewModel[]>(this.URL + '/discover')
  }
}
