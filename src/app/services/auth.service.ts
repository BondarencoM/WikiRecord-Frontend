import { EventEmitter, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import * as Oidc from 'oidc-client'
import { environment } from 'src/environments/environment'
import { AuthenticatedUser } from '../models/AuthenticatedUser'

const BASE_URL = window.origin + environment.baseHref

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new Oidc.UserManager({
    authority: environment.authenticationAuthority,
    client_id: 'angular-app',
    redirect_uri: BASE_URL + 'auth-callback',
    post_logout_redirect_uri: BASE_URL + 'auth-signout-callback',
    response_type: 'code',
    automaticSilentRenew: true,
    scope: 'openid profile recommendation-service profile-service comment-service',
    filterProtocolClaims: true,
    loadUserInfo: true,
    silent_redirect_uri: BASE_URL + 'auth-silent-callback',
})

  UserChanged = new EventEmitter<AuthenticatedUser>()

  constructor (private router: Router) {
    if (!environment.production) { Oidc.Log.logger = console }

    this.manager.events.addUserLoaded( u => this.notifyUserChanged(u))
    this.manager.events.addUserUnloaded(() => this.notifyUserChanged())
   }

  private notifyUserChanged(user?: Oidc.User): void{
    this.UserChanged.emit(user ? new AuthenticatedUser(user) : null)
  }

  startAuthentication(returnUrl: string = null): void{
    this.saveRestorePath(returnUrl)
    this.manager.signinRedirect().catch(e => console.log({authenticationError: e}))
  }

  completeAuthentication = () => {
    if (window.location.search){
      this.manager.signinRedirectCallback().then(() => this.restorePath())
    }
  }

  startRegistrationRedirect(): void {
    this.saveRestorePath()
    const callback = encodeURIComponent(BASE_URL + '/registration-callback')
    window.location.href = environment.authenticationAuthority + '/Account/Register?returnUrl=' + callback
  }

  startAuthenticationSilently(): void{
    this.manager.signinSilent()
    .then(this.restorePath)
    .catch(e => console.log({authenticationError: e}))
  }

  completeAuthenticationSilently = () => this.manager.signinSilentCallback()

  startSignOut(): void {
    // for now, returning to the same page after signout may conflict with auth guards
    this.saveRestorePath('/')
    this.manager.signoutRedirect()
  }

  completeSignOut = () => this.manager.signoutRedirectCallback().then(this.restorePath)

  async getAuthenticatedeUser(): Promise<AuthenticatedUser>{
    try{
      const user = await this.manager.getUser()
      return new AuthenticatedUser(user)
    }catch (ex){
      console.log({authenticationError: ex})
    }

  }

  private saveRestorePath = (returnUrl: string = null) => localStorage.setItem('restore-url', returnUrl || this.router.url)

  private restorePath = () => {
    this.router.navigateByUrl(localStorage.getItem('restore-url') || '/')
  }

}

