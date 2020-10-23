import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddPersonaVM } from '../models/persona/AddPersonaVM';
import { Persona } from '../models/persona/Persona';
import { PersonaWithInterests } from '../models/persona/PersonaWithInterests';

const URL = environment.personasServiceURL;


@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient) {}

  find(id: number): Observable<PersonaWithInterests> {
    return this.http.get<PersonaWithInterests>(`${URL}/${id}/recommendations`)
  }

  getRecommendedPersonas(): Observable<PersonaWithInterests[]>{
    return this.http.get<PersonaWithInterests[]>(URL + '/discover')
  }

  create(model: AddPersonaVM): Observable<Persona> {
    return this.http.post<Persona>(URL, model)
  }
}
