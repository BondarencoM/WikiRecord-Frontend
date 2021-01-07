import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service'
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor {

  constructor (private auth: AuthService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const requestIsInternal = environment.hostsRequiringAccessToken.some(host => request.url.startsWith(host))

    if (!requestIsInternal) {
        return next.handle(request)
    }

    // That's way too complicated, RxJS
    return from(this.auth.getAuthenticatedeUser())
            .pipe(mergeMap( user => {
                if (user.isLoggedIn()){
                    request = request.clone({
                        setHeaders: { Authorization: user.getAuthorizationHeaderValue() }
                    })
                }
                return next.handle(request)
            }))
  }
}
