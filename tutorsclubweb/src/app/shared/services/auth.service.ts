import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { ConfigService } from './config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

    baseUrl: string = '';
    private loggedIn = false;
    private userId = '';
  
  
    constructor(private http: Http,private router: Router, private config_service: ConfigService,) {
   
      this.loggedIn = !!localStorage.getItem('auth_token');
  
      // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
      // header component resulting in authed user nav links disappearing despite the fact user is still logged in
     
      this.baseUrl = config_service.getApiUrl();
    }
  
    
     login(req) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http
        .post(
        this.baseUrl + 'api/Account/Login',
        "username=" + req.userName + "&password=" + req.password ,{ headers })
      
        .map(res => res.json())
        .map((res: any) =>  {
          localStorage.setItem('UserId', res.userId);
          localStorage.setItem('auth_token', res.access_token);
          localStorage.setItem('currentUser',  JSON.stringify(res));
          localStorage.setItem('UserDetails',JSON.stringify(res.UserDetails));
          localStorage.setItem('UserRoleId',res.UserDetails.RoleID) 
          localStorage.setItem('UserActivityRights',JSON.stringify(res.ActivityRights) 
        );
          
          this.loggedIn = true;
          return true;
        })
    }
  
    logout() {
      localStorage.removeItem('UserId');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('UserDetails');
      localStorage.removeItem('UserRoleId');
      localStorage.removeItem('UserActivityRights');
      this.loggedIn = false;
      this.router.navigate(['/']);
      location.reload();
    }
  
    isLoggedIn() {
      return this.loggedIn;
    }  
  
    token(){
      return localStorage.getItem('auth_token');
    }

    roleMatch(allowedRoles): boolean {
      var isMatch = false;
      var RoleIds = localStorage.getItem('UserRoleId');
      allowedRoles.forEach(element => {
        if (RoleIds.indexOf(element) > -1) {
          isMatch = true;
          return false;
        }
      });
      return isMatch;
    }

   }
  
  
   


