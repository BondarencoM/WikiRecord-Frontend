import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-signout-callback-page',
  template: `<p>Redirecting...</p>`,
})
export class AuthSignoutCallbackPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.completeSignOut().then(() => this.router.navigate(['/']))
  }

}