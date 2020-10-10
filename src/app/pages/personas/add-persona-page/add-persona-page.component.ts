import { Component, OnInit } from '@angular/core';
import { AddPersonaVM } from 'src/app/models/view-models/AddPersonaVM';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-add-persona-page',
  templateUrl: './add-persona-page.component.html',
  styleUrls: ['./add-persona-page.component.css']
})
export class AddPersonaPageComponent implements OnInit {

  model = new AddPersonaVM()


  constructor(private personasService: PersonasService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.personasService.create(this.model).subscribe(console.log);

  }

}
