import { Component, OnInit } from '@angular/core'
import { PersonaWithInterests } from 'src/app/models/persona/PersonaWithInterests'
import { PersonasService } from 'src/app/services/personas.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  searchresult: PersonaWithInterests[]

  constructor(
    private personas: PersonasService,
  ) { }


  ngOnInit(): void {
    this.personas.searchObserver.subscribe(result => this.searchresult = result)
  }


}
