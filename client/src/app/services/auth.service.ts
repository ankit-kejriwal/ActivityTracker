import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
authToken : any;
user: any;
  constructor(
    private http: HttpClient) { }

  registerUser(user){
    const headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers});
  }

  authenticateUser(user){
    const headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers});
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  logout(){
    this.authToken = null;
    this.user  = null;
    localStorage.clear();
  }
  loggedIn(){
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(this.authToken);
  }

}
