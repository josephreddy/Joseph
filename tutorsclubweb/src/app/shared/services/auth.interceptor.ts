import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        
        const token: string = this.auth.token();
        request = request.clone({
            setHeaders: {
              Authorization: `bearer ${this.auth.token()}`
            }
          });
      
          return next.handle(request);
    }
}
