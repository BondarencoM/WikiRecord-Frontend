import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DiscoverPersonaViewModel } from '../models/persona/DiscoverPersonaViewModel';
import { AddPersonaVM } from '../models/persona/AddPersonaVM';
import { Persona } from '../models/persona/Persona';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  readonly URL = environment.personasServiceURL;


  constructor(private http: HttpClient) {}

  getRecommendedPersonas(): Observable<DiscoverPersonaViewModel[]>{
    return this.http.get<DiscoverPersonaViewModel[]>(this.URL + '/discover')
  }

  create(model: AddPersonaVM): Observable<Persona> {
    return this.http.post<Persona>(this.URL, model)
  }
}
