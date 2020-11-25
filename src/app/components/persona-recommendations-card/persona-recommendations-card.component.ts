import { Component, OnInit, Input } from '@angular/core';
import { Persona } from 'src/app/models/persona/Persona';
import { PersonaWithInterests } from 'src/app/models/persona/PersonaWithInterests';

@Component({
  selector: 'app-persona-recommendations-card',
  templateUrl: './persona-recommendations-card.component.html',
  styleUrls: ['./persona-recommendations-card.component.css']
})
export class PersonaRecommendationsCardComponent implements OnInit {

  @Input() persona: PersonaWithInterests;

  constructor() { }

  ngOnInit(): void {
  }

}
