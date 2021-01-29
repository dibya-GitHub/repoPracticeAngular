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
  setLoginInfo(data: any) {
    sessionStorage.setItem('token', data.token);
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
