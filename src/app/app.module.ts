import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PersonaRecommendationsCardComponent } from './components/persona-recommendations-card/persona-recommendations-card.component';
import { InterestShortEntryComponent } from './components/interest-short-entry/interest-short-entry.component';
import { DiscoverPersonasViewComponent } from './components/discover-personas-view/discover-personas-view.component';
import { StandardHeaderComponent } from './components/standard-header/standard-header.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PersonaRecommendationsCardComponent,
    InterestShortEntryComponent,
    DiscoverPersonasViewComponent,
    StandardHeaderComponent,
    LogInPageComponent,
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
