import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-silent-callback-page',
  template: `<p>Redirecting...</p>`,
})
export class AuthSilentCallbackPageComponent implements OnInit {

  constructor ( private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.completeAuthenticationSilently()
  }

}
