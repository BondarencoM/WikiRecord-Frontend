import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'src/app/services/personas.service';
import { DiscoverPersonaViewModel } from 'src/app/models/DiscoverPersonaViewModel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private personasService: PersonasService) { }

  personas: DiscoverPersonaViewModel[] = []


  ngOnInit(): void {
    this.personasService.getRecommendedPersonas().subscribe( personas => {
      this.personas = personas.map(DiscoverPersonaViewModel.AttachMethods)
    })
  }

}
