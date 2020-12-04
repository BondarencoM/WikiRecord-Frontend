import { Injectable } from '@angular/core'
import { AsyncSubject, Observable, Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { AddPersonaVM } from '../models/persona/AddPersonaVM'
import { Persona } from '../models/persona/Persona'
import { PersonaWithInterests } from '../models/persona/PersonaWithInterests'

const URL = environment.personasServiceURL


@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private searchResults = new Subject<PersonaWithInterests[]>()
  public searchObserver = this.searchResults.asObservable()

  constructor(private http: HttpClient) { }

  find(id: number): Observable<PersonaWithInterests> {
    return this.http.get<PersonaWithInterests>(`${URL}/${id}/recommendations`)
  }

  getRecommendedPersonas(): Observable<PersonaWithInterests[]> {
    return this.http.get<PersonaWithInterests[]>(URL + '/discover')
  }

  create(model: AddPersonaVM): Observable<Persona> {
    return this.http.post<Persona>(URL, model)
  }

  launchSearch(search: string): void {
    this.http.get<PersonaWithInterests[]>(URL + '/search/' + search).subscribe(r => {
      this.searchResults.next(r.map(PersonaWithInterests.AttachMethods))
    })
  }

  clearSearch(): void {
    this.searchResults.next(null)
  }


}
