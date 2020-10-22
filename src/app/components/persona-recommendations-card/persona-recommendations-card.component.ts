import { Component, OnInit, Input } from '@angular/core';
import { DiscoverPersonaViewModel } from 'src/app/models/persona/DiscoverPersonaViewModel';
import { Persona } from 'src/app/models/persona/Persona';

@Component({
  selector: 'app-persona-recommendations-card',
  templateUrl: './persona-recommendations-card.component.html',
  styleUrls: ['./persona-recommendations-card.component.css']
})
export class PersonaRecommendationsCardComponent implements OnInit {

  @Input() discoverPersonaModel: DiscoverPersonaViewModel;

  constructor() { }

  ngOnInit(): void {
  }

}
