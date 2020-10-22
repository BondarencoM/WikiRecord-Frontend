import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaWithInterests } from 'src/app/models/persona/PersonaWithInterests';
import { Recommendation } from 'src/app/models/recommendations/Recommendation';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-view-persona-page',
  templateUrl: './view-persona-page.component.html',
  styleUrls: ['./view-persona-page.component.css']
})
export class ViewPersonaPageComponent implements OnInit {

  constructor(
    private personaService: PersonasService,
    private route: ActivatedRoute
  ) { }

  persona: PersonaWithInterests

  // recommendations : [string, Recommendation[]][]

  ngOnInit(): void {
    this.personaService.find(this.route.snapshot.params.id).subscribe( persona => {
      this.persona = PersonaWithInterests.AttachMethods(persona)
      console.log(this.persona.getRecommendationsByType())
    })
  }

}
