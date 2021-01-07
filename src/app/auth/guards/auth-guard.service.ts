import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor (
    private auth: AuthService,
  ) { }
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const user = await this.auth.getAuthenticatedeUser()

    if (user.isLoggedIn()){
      return true
    }else{
      this.auth.startAuthentication(route.url.join('/'))
      return false
    }
  }
}
