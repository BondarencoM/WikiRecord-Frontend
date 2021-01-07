import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaWithInterests } from 'src/app/models/persona/PersonaWithInterests';
import { Recommendation } from 'src/app/models/recommendations/Recommendation';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-view-persona-page',
  templateUrl: './view-persona-page.component.html',
  styleUrls: ['./view-persona-page.component.css']
})
export class ViewPersonaPageComponent implements OnInit {

  constructor (
    private personaService: PersonasService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  persona: PersonaWithInterests

  ngOnInit(): void {
    this.personaService.find(this.route.snapshot.params.id).subscribe( persona => {
      this.persona = PersonaWithInterests.AttachMethods(persona)
    })
  }

  registerButtonClicked(): void{
    this.router.navigate(['recommendations', 'add'], {state : {persona: this.persona}})
  }

}
