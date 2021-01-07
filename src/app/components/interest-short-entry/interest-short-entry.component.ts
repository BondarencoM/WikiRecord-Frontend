import { Component, OnInit, Input } from '@angular/core';
import { Interest } from 'src/app/models/interest/Interest';

@Component({
  selector: 'app-interest-short-entry',
  templateUrl: './interest-short-entry.component.html',
  styleUrls: ['./interest-short-entry.component.css']
})
export class InterestShortEntryComponent {

  @Input() interest: Interest

  constructor () { }

}
