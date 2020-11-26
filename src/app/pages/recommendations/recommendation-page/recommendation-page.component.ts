import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from 'src/app/services/recommendations.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Recommendation } from 'src/app/models/recommendations/Recommendation';
import { Images } from 'src/app/utils/Images';

@Component({
  selector: 'app-recommendation-page',
  templateUrl: './recommendation-page.component.html',
  styleUrls: ['./recommendation-page.component.css']
})
export class RecommendationPageComponent implements OnInit {

  private id: number
  public recommendation: Recommendation

  public readonly HEART_PATH = Images.FallbackPersonaImage

  constructor(
    private recommendations: RecommendationsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.recommendations.getById(this.id).subscribe({
      next: result =>  this.recommendation = Recommendation.AttachMethods(result)
    })
  }


}
