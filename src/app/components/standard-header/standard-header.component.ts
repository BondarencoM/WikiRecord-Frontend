import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { stringify } from 'querystring'
import { AuthenticatedUser } from 'src/app/models/AuthenticatedUser'
import { AuthService } from 'src/app/services/auth.service'
import { PersonasService } from 'src/app/services/personas.service'

@Component({
  selector: 'app-standard-header',
  templateUrl: './standard-header.component.html',
  styleUrls: ['./standard-header.component.css']
})
export class StandardHeaderComponent implements OnInit {

  searchModel: string

  public user: AuthenticatedUser

  constructor (
    private authService: AuthService,
    private personas: PersonasService,
  ) { }

  ngOnInit(): void {
    this.authService.getAuthenticatedeUser().then(user => this.user = user)
    this.authService.UserChanged.subscribe(user => this.user = user)
  }

  loginButtonClicked(): void {
    this.authService.startAuthentication()
  }

  logoutButtonClicked(): void {
    this.authService.startSignOut()
  }

  signUpButtonClicked(): void {
    this.authService.startRegistrationRedirect()
  }

  searchModelChanged(): void {
    const search = this.searchModel

    setTimeout(() => {
      if (!this.searchModel.trim()) {
        this.personas.clearSearch()
      }
      if (this.searchIsStillRelevant(search)) {
        this.personas.launchSearch(search)
      }
    }, 300)
  }

  private searchIsStillRelevant(search: string): boolean {
    return search && search === this.searchModel
  }
}
