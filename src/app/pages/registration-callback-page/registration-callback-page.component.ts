import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration-callback-page',
  template: `<p>Redirecting...</p>`,
})
export class RegistrationCallbackPageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const redirectUrl = localStorage.getItem('restore-url')
    this.auth.startAuthenticationSilently(redirectUrl)
  }

}
