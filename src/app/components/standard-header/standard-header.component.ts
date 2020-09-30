import { Component, OnInit } from '@angular/core';
import { AuthService, AuthenticatedUser } from 'src/app/services/auth.service';

@Component({
  selector: 'app-standard-header',
  templateUrl: './standard-header.component.html',
  styleUrls: ['./standard-header.component.css']
})
export class StandardHeaderComponent implements OnInit {

  public user: AuthenticatedUser

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAuthenticatedeUser().then(user => this.user = user)
    this.authService.onUserLoaded(user => this.user = user)
  }

  loginButtonClicked(){
    this.authService.startAuthentication()
  }
}
