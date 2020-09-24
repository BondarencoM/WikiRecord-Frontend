import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component'
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { RecommendationPageComponent } from './pages/recommendation-page/recommendation-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'log-in', component: LogInPageComponent},
  {path: 'recommendations/:id', component: RecommendationPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
