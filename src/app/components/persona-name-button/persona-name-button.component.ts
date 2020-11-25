import { Component, Input, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona/Persona';

@Component({
  selector: 'app-persona-name-button',
  template: `
  <span *ngIf="persona" routerLink="/personas/{{persona.id}}" class="font-weight-bold cursor-pointer">
    {{persona.name}}
  </span>
  `,
})
export class PersonaNameButtonComponent {

  @Input() persona: Persona

}
