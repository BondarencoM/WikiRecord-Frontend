import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticatedUser } from 'src/app/models/AuthenticatedUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-standard-header',
  templateUrl: './standard-header.component.html',
  styleUrls: ['./standard-header.component.css']
})
export class StandardHeaderComponent implements OnInit {

  search: string

  public user: AuthenticatedUser

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAuthenticatedeUser().then(user => this.user = user)
    this.authService.UserChanged.subscribe(user => this.user = user)
  }

  loginButtonClicked(): void{
    this.authService.startAuthentication()
  }

  logoutButtonClicked(): void{
    this.authService.startSignOut()
  }

  signUpButtonClicked(): void{
    this.authService.startRegistrationRedirect()
  }

  searchModelChanged(): void {
  }
}
