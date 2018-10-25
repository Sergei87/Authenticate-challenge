import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }

  public logIn(username, password) {
    return this.http.post('/login', { username, password })
  }

  public registrate(username, password) {
    return this.http.post('/register', { username, password })
  }

  public logOut() {
    console.log('-------')
    return this.http.get('/logout')
  }

  public getSubordinates() {
    return this.http.get('/subordinates')
  }
}
