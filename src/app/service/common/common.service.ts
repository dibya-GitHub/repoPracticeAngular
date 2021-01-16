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
  currencyList() {
    return this.http.get(this.baseUrl + '/currency/list');
  }
  getCurrentUser() {
    return this.http.get(this.baseUrl + '/user/get_current_user');
  }
  getCurrentUserId() {
    return this.http.get(this.baseUrl + '/user/get_current_user_id');
  }
  fetchAllGroups() {
    return this.http.get(this.baseUrl + '/groups/get_group');
  }
  fetchGroupType() {
    return this.http.get(this.baseUrl + '/group/get_group_type');
  }
  createGroup(formData) {
    return this.http.post(this.baseUrl + '/groups/create_group', formData);
  }
  editGroup(formData) {
    return this.http.put(this.baseUrl + '/groups/edit_group', formData);
  }
  getGroupInfoById(id) {
    return this.http.post(this.baseUrl + '/groups/get_groupby_id', id);
  }
  deleteGroupById(id) {
    return this.http.delete(this.baseUrl + '/groups/' + id)
  }
  getExpenseDetailsByGroupId(id) {
    return this.http.post(this.baseUrl + '/expense/get_expenses', id);
  }
  getTodaysExpense(id) {
    return this.http.post(this.baseUrl + '/expense/get_expenses/today', id);
  }
}
