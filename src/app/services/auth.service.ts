import { Injectable } from '@angular/core';
import { UserManager, UserManagerEvents } from 'oidc-client';
import { environment } from 'src/environments/environment';
import { AuthenticatedUser } from '../models/AuthenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private manager = new UserManager({
    authority: environment.auathenticationAuthority,
    client_id: 'angular-app',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: window.origin + '/auth-signout-callback',
    response_type: 'id_token token',
    scope: 'openid profile recommendation-service user-profile-service',
    filterProtocolClaims: true,
    loadUserInfo: true
})

  constructor() { }

  startAuthentication = () => this.manager.signinRedirect()

  completeAuthentication = () => this.manager.signinRedirectCallback()
  
  completeSignOut = () => this.manager.signoutRedirectCallback()

  logout(){
    this.manager.signoutRedirect()
  } 

  getAuthenticatedeUser(): Promise<AuthenticatedUser>{
    return this.manager.getUser().then( u => new AuthenticatedUser(u) )
  }

  onUserLoaded(callback: (user: AuthenticatedUser) => void){
    this.manager.events.addUserLoaded(u => callback(new AuthenticatedUser(u)))
  }

  onUserUnloaded(callback: () => void){
    this.manager.events.addUserUnloaded(callback)
  }
}

