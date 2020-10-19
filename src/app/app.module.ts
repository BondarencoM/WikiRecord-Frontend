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
import { RecommendationPageComponent } from './pages/recommendation-page/recommendation-page.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { AuthCallbackPageComponent } from './pages/auth-callback-page/auth-callback-page.component';
import { AuthService } from './services/auth.service';
import { AuthSignoutCallbackPageComponent } from './pages/auth-signout-callback-page/auth-signout-callback-page.component';
import { RegistrationCallbackPageComponent } from './pages/registration-callback-page/registration-callback-page.component';
import { AuthSilentCallbackPageComponent } from './pages/auth-silent-callback-page/auth-silent-callback-page.component';
import { AddPersonaPageComponent } from './pages/personas/add-persona-page/add-persona-page.component';
import { FormsModule } from '@angular/forms';
import { AddInterestPageComponent } from './pages/interests/add-interest-page/add-interest-page.component';
import { AddRecommendationPageComponentComponent } from './pages/recommendations/add-recommendation-page-component/add-recommendation-page-component.component';
import { WikiEntitySelectorComponent } from './components/wiki-entity-selector/wiki-entity-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PersonaRecommendationsCardComponent,
    InterestShortEntryComponent,
    DiscoverPersonasViewComponent,
    StandardHeaderComponent,
    RecommendationPageComponent,
    LoadingIndicatorComponent,
    AuthCallbackPageComponent,
    AuthSignoutCallbackPageComponent,
    RegistrationCallbackPageComponent,
    AuthSilentCallbackPageComponent,
    AddPersonaPageComponent,
    AddInterestPageComponent,
    AddRecommendationPageComponentComponent,
    WikiEntitySelectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
