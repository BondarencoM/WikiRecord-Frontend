import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PersonaRecommendationsCardComponent } from './components/persona-recommendations-card/persona-recommendations-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterestShortEntryComponent } from './components/interest-short-entry/interest-short-entry.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PersonaRecommendationsCardComponent,
    InterestShortEntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
