import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor() {
    const authToken = sessionStorage.getItem('token');
    if (authToken) {
      this.isLoggedIn = true;
    }
  }
  setLoginInfo(token: any) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('isLoggedIn', "true");
  }
  getAuthToken() {
    const authToken = sessionStorage.getItem('token');
    return authToken;
  }
  clearToken() {
    this.isLoggedIn = false;
    sessionStorage.clear();

  }
  getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
  }
}
