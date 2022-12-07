import { HttpErrorResponse } from '@angular/common/http'
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

  personas: PersonaWithInterests[] | null = null
  errorMessage : string | null = null

  async ngOnInit(): Promise<void> {
    try {
      const personas = await this.personasService.getRecommendedPersonas().toPromise()
      this.personas = personas.map(PersonaWithInterests.AttachMethods)
    }
    catch (ex) {
      console.log(ex)
      if (ex instanceof HttpErrorResponse) {
        this.errorMessage = ex.message
      }
    }
  }


}
