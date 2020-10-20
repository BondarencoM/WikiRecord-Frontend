import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
  ) { }
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let user = await this.auth.getAuthenticatedeUser()

    if(user.isLoggedIn()){
      return true
    }else{
      this.auth.startAuthentication(route.url.join('/'))
      return false
    }
  }
}
