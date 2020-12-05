import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = environment.baseUrl;
  private messageSource = new BehaviorSubject(false);
  isLoggedInMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {

  }
  checkIsLoggedIn(isLoggedIn: boolean) {
    this.messageSource.next(isLoggedIn);
  }
  getAuthToken() {
    let tokenKey = sessionStorage.getItem('token');
    return tokenKey;
  }
  login(body: any) {
    return this.http.post(this.baseUrl + '/auth/user/login', body);
  }
  register(body: any) {
    return this.http.post(this.baseUrl + '/auth/user/signup', body);
  }
  logout(body: any) {
    return this.http.post(this.baseUrl + '/auth/user/logout', body);
  }
  getProfileMe() {
    return this.http.get(this.baseUrl + '/auth/user/profile/me');
  }
  getUserProfile() {
    return this.http.get(this.baseUrl + '/auth/user/me');
  }
  updateProfile(body) {
    return this.http.put(this.baseUrl + '/auth/user/profile/me', body);
  }
  countryList() {
    return this.http.get(this.baseUrl + '/country/list');
  }
  zoneList(countryId) {
    return this.http.get(this.baseUrl + '/country/' + countryId + '/state/');
  }
}
