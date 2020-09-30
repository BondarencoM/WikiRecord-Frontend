import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-callback-page',
  templateUrl: './auth-callback-page.component.html',
  styleUrls: ['./auth-callback-page.component.css']
})
export class AuthCallbackPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.completeAuthentication().then(() => this.router.navigate(['/']))
  }
}
