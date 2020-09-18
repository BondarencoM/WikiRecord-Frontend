import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component'
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'log-in', component: LogInPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
