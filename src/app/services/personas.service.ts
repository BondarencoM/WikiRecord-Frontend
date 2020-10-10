import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DiscoverPersonaViewModel } from '../models/DiscoverPersonaViewModel';
import { AddPersonaVM } from '../models/view-models/AddPersonaVM';
import { Persona } from '../models/Persona';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  readonly URL = environment.personasServiceURL;


  constructor(private http: HttpClient) {}

  getRecommendedPersonas(): Observable<DiscoverPersonaViewModel[]>{
    return this.http.get<DiscoverPersonaViewModel[]>(this.URL + '/discover')
  }

  create(model: AddPersonaVM) : Observable<Persona> {
    return this.http.post<Persona>(this.URL, model)
  }
}
