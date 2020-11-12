import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient) { }

  addEvent(clickevent){
    const headers = new HttpHeaders();
    let user: any = JSON.parse(localStorage.getItem('user'));
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/addevent/' + user.id, clickevent, {headers});
  }
}
