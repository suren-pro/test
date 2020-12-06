import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logIn(email, password) {
    const login: Login = {
      email,
      password
    };
    return this.http.post<{error: string}>('api/Login/login', login, {observe:"response"});
  }

  getUser():  Observable<User> {
    return this.http.get<User>('api/Profile/getProfile')
  }
  
}
