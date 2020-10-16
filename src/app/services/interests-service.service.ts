import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateInterestVM } from '../models/interest/CreateInterestVM';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Interest } from '../models/interest/Interest';
import { WikiIdentifier } from '../models/wiki/WikiIdentifier';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  baseUrl = environment.interestServiceURL

  private BookTypes = [
    WikiIdentifier.Anthalogy,
    WikiIdentifier.Book,
    WikiIdentifier.EpicPoem,
    WikiIdentifier.Haiku,
    WikiIdentifier.LiteraryWork,
    WikiIdentifier.Myth,
    WikiIdentifier.Novel ,
    WikiIdentifier.Novella ,
    WikiIdentifier.Poem ,
    WikiIdentifier.ShortStory,
    WikiIdentifier.ShortNovel,
    WikiIdentifier.WrittenWork,
    WikiIdentifier.Xiaoshuo,
  ]

  private MovieTypes = [
    WikiIdentifier.AnimatedSeries,
    WikiIdentifier.AnimeTVSeries,
    WikiIdentifier.FeatureFilm,
    WikiIdentifier.Film3D,
    WikiIdentifier.Film,
    WikiIdentifier.Miniseries,
    WikiIdentifier.TVSeries,
    WikiIdentifier.TVSerial,
  ]

  private GameTypes = [
    WikiIdentifier.VideoGame,
    WikiIdentifier.VideoGameMod,
  ]

  private PodcastTypes = [
    WikiIdentifier.Podcast,
    WikiIdentifier.RadioDramaSeries,
  ]

  private OtherTypes = [
    WikiIdentifier.CreativeWork,
  ]

  public AcceptedInterestsTypes = [
    ...this.BookTypes,
    ...this.MovieTypes,
    ...this.GameTypes,
    ...this.PodcastTypes,
    ...this.OtherTypes,
  ].map(e => e.toString())


  constructor(private http: HttpClient) { }

  createInterest(interest: CreateInterestVM): Observable<Interest>{
    return this.http.post<Interest>(this.baseUrl, interest)
  }

}
