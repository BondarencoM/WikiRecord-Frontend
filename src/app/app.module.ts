import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PersonaRecommendationsCardComponent } from './components/persona-recommendations-card/persona-recommendations-card.component';
import { InterestShortEntryComponent } from './components/interest-short-entry/interest-short-entry.component';
import { DiscoverPersonasViewComponent } from './components/discover-personas-view/discover-personas-view.component';
import { StandardHeaderComponent } from './components/standard-header/standard-header.component';
import { RecommendationPageComponent } from './pages/recommendations/recommendation-page/recommendation-page.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { AuthCallbackPageComponent } from './pages/auth-callback-page/auth-callback-page.component';
import { AuthService } from './services/auth.service';
import { AuthSignoutCallbackPageComponent } from './pages/auth-signout-callback-page/auth-signout-callback-page.component';
import { RegistrationCallbackPageComponent } from './pages/registration-callback-page/registration-callback-page.component';
import { AuthSilentCallbackPageComponent } from './pages/auth-silent-callback-page/auth-silent-callback-page.component';
import { AddPersonaPageComponent } from './pages/personas/add-persona-page/add-persona-page.component';
import { FormsModule } from '@angular/forms';
import { AddInterestPageComponent } from './pages/interests/add-interest-page/add-interest-page.component';
import { AddRecommendationPageComponent } from './pages/recommendations/add-recommendation-page/add-recommendation-page.component';
import { WikiEntitySelectorComponent } from './components/wiki-entity-selector/wiki-entity-selector.component';
import { TokenHttpInterceptor } from './auth/interceptors/TokenHttpInterceptor';
import { ViewPersonaPageComponent } from './components/view-persona-page/view-persona-page.component';
import { PersonaNameButtonComponent } from './components/persona-name-button/persona-name-button.component';


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
    AddRecommendationPageComponent,
    WikiEntitySelectorComponent,
    ViewPersonaPageComponent,
    PersonaNameButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
