import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router ,private auth: AuthService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isLoggedIn())
      {
        let roles = next.data["roles"] as Array<string>;
        if (roles) {
          var match = this.auth.roleMatch(roles);
          if (match) return true;
          else {
            this.router.navigate(['/not-found']);
            return false;
          }
        }
        else
          return true;
      }
      this.router.navigate(['/']);
      return false;
  }
}
