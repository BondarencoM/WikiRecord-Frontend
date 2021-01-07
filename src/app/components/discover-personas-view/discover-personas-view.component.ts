import { Component, OnInit } from '@angular/core';
import { PersonaWithInterests } from 'src/app/models/persona/PersonaWithInterests';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-discover-personas-view',
  templateUrl: './discover-personas-view.component.html',
  styleUrls: ['./discover-personas-view.component.css']
})
export class DiscoverPersonasViewComponent implements OnInit {

  constructor (private personasService: PersonasService) { }

  personas: PersonaWithInterests[] = []

  ngOnInit(): void {
    this.personasService.getRecommendedPersonas().subscribe( personas => {
      this.personas = personas.map(PersonaWithInterests.AttachMethods)
    })
  }


}
