import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor() {
    const authToken = JSON.parse(sessionStorage.getItem('authToken'));
    if (authToken) {
      this.isLoggedIn = true;
    }
  }
  setLoginInfo(data: any) {
    sessionStorage.setItem('authToken', JSON.stringify(data.access_token));
    sessionStorage.setItem('userData', JSON.stringify(data));
  }
  getAuthToken() {
    const authToken = JSON.parse(sessionStorage.getItem('authToken'));
    return authToken;
  }
  clearToken() {
    this.isLoggedIn = false;
  }
  getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
  }
}
