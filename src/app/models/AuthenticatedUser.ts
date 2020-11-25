import { Profile, User } from 'oidc-client'

export class AuthenticatedUser{

    constructor(private user: User){}

    get claims(): Profile {
      return this.user.profile || null
    }

    isLoggedIn = () => this.user != null && !this.user.expired

    getAuthorizationHeaderValue = () => this.user ? this.user.token_type + ' ' + this.user.access_token : null

  }
