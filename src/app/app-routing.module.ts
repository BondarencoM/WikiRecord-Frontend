import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component'
import { RecommendationPageComponent } from './pages/recommendation-page/recommendation-page.component';
import { AuthCallbackPageComponent } from './pages/auth-callback-page/auth-callback-page.component';
import { AuthSignoutCallbackPageComponent } from './pages/auth-signout-callback-page/auth-signout-callback-page.component';
import { RegistrationCallbackPageComponent } from './pages/registration-callback-page/registration-callback-page.component';
import { AuthSilentCallbackPageComponent } from './pages/auth-silent-callback-page/auth-silent-callback-page.component';
import { AddPersonaPageComponent } from './pages/personas/add-persona-page/add-persona-page.component';
import { AddInterestPageComponent } from './pages/interests/add-interest-page/add-interest-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'recommendations/:id', component: RecommendationPageComponent},
  {path: 'auth-callback', component: AuthCallbackPageComponent},
  {path: 'auth-signout-callback', component: AuthSignoutCallbackPageComponent},
  {path: 'registration-callback', component: RegistrationCallbackPageComponent},
  {path: 'auth-silent-callback', component: AuthSilentCallbackPageComponent},
  {path: 'personas/add', component: AddPersonaPageComponent},
  {path: 'interests/add', component: AddInterestPageComponent},
  {path: '**', component: HomePageComponent},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
