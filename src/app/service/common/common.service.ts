import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {

  }
  getAuthToken() {
    let tokenKey = sessionStorage.getItem('token');
    return tokenKey;
  }
  login(body: any) {
    return this.http.post(this.baseUrl + '/user/login', body);
  }

}
