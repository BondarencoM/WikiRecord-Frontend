import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as Oidc from 'oidc-client';
import { environment } from 'src/environments/environment';
import { AuthenticatedUser } from '../models/AuthenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new Oidc.UserManager({
    authority: environment.authenticationAuthority,
    client_id: 'angular-app',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: window.origin + '/auth-signout-callback',
    response_type: 'id_token token',
    scope: 'openid profile recommendation-service user-profile-service',
    filterProtocolClaims: true,
    loadUserInfo: true,
    silent_redirect_uri: 'http://localhost:4200/auth-silent-callback',
})

  UserChanged = new EventEmitter<AuthenticatedUser>()

  constructor(private router: Router) {
    Oidc.Log.logger = console
    this.manager.events.addUserLoaded( u => this.notifyUserChanged(u))
    this.manager.events.addUserUnloaded(() => this.notifyUserChanged())
   }

  private notifyUserChanged(user?: Oidc.User): void{
      this.UserChanged.emit( user ? new AuthenticatedUser(user) : null)
  }

  startAuthentication = () => this.manager.signinRedirect()

  completeAuthentication = () => this.manager.signinRedirectCallback()

  startAuthenticationSilently = (redirectUrl = '/') => {
    this.manager.signinSilent()
      .then(() => this.router.navigateByUrl(redirectUrl));
  }

  startSignOut = () => this.manager.signoutRedirect()

  completeAuthenticationSilently = () => this.manager.signinSilentCallback()

  completeSignOut = () => this.manager.signoutRedirectCallback()


  getAuthenticatedeUser(): Promise<AuthenticatedUser>{
    return this.manager.getUser().then( u => new AuthenticatedUser(u) )
  }

}

