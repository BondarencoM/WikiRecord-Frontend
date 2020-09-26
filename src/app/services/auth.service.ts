import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerEvents } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager({
    authority: 'https://localhost:6001/',
    client_id: 'angular-app',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'openid profile',
    filterProtocolClaims: true,
    loadUserInfo: true
})

  constructor() { }

  startAuthentication = () => this.manager.signinRedirect()

  completeAuthentication = () => this.manager.signinRedirectCallback()

  getAuthenticatedeUser(): Promise<AuthenticatedUser>{
    return this.manager.getUser().then( u => new AuthenticatedUser(u) )
  }

  onUserLoaded(callback: (user: AuthenticatedUser) => void){
    this.manager.events.addUserLoaded((u) => callback(new AuthenticatedUser(u)))
  }


}

export class AuthenticatedUser{

  constructor(private user: User){}

  get claims() : unknown {
    return this.user.profile || null 
  }

  isLoggedIn = () => this.user != null && !this.user.expired

  getAuthorizationHeaderValue = () => this.user ? this.user.token_type + ' ' + this.user.access_token : null

}
