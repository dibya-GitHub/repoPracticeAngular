import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";

import { HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class CommonService {
  baseUrl: any = environment.baseUrl;
  headers = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Access-Control-Allow-Origin", "*");
  private messageSource = new BehaviorSubject(false);
  isLoggedInMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {}
  checkIsLoggedIn(isLoggedIn: boolean) {
    this.messageSource.next(isLoggedIn);
  }
  getAuthToken() {
    let tokenKey = sessionStorage.getItem("token");
    return tokenKey;
  }
  login(body: any) {
    return this.http.post(this.baseUrl + "/api/user/signin", body);
  }
  register(body: any) {
    return this.http.post(this.baseUrl + "/api/user/signup", body);
  }
  logout(body: any) {
    return this.http.post(this.baseUrl + "/api/user/logout", body);
  }
  getProfileMe() {
    return this.http.get(this.baseUrl + "/api/user/profile/me");
  }
  getUserProfile() {
    return this.http.get(this.baseUrl + "/api/user/me", {
      headers: this.headers,
    });
  }
  updateProfile(body) {
    return this.http.put(this.baseUrl + "/api/user/profile/me", body);
  }
  countryList() {
    return this.http.get(this.baseUrl + "/country/list");
  }
  zoneList(countryId) {
    return this.http.get(this.baseUrl + "/country/" + countryId + "/state/");
  }
  currencyList() {
    return this.http.get(this.baseUrl + "/currency/list");
  }
  updateUser(id, formData) {
    return this.http.put(this.baseUrl + "/user/userUpdate/" + id, formData);
  }
  getCurrentUser(id) {
    return this.http.get(this.baseUrl + "/user/get_current_user/" + id);
  }
  getCurrentUserId(id) {
    return this.http.get(this.baseUrl + "/user/get_current_user_id/" + id);
  }
  fetchAllGroups(id) {
    return this.http.get(this.baseUrl + "/groups/get_group/" + id);
  }
  fetchGroupType() {
    return this.http.get(this.baseUrl + "/group/get_group_type");
  }
  createGroup(formData) {
    return this.http.post(this.baseUrl + "/groups/create_group", formData);
  }
  editGroup(formData) {
    return this.http.put(this.baseUrl + "/groups/edit_group", formData);
  }
  getGroupInfoById(id) {
    return this.http.post(this.baseUrl + "/groups/get_groupby_id", id);
  }
  deleteGroupById(id) {
    return this.http.delete(this.baseUrl + "/groups/" + id);
  }
  getExpenseDetailsByGroupId(id) {
    return this.http.post(this.baseUrl + "/expense/get_expenses", id);
  }
  getTodaysExpense(id) {
    return this.http.post(this.baseUrl + "/expense/get_expenses/today", id);
  }
  createExpense(formData) {
    return this.http.post(this.baseUrl + "/expense/create_expense", formData);
  }
  editExpense(formData) {
    return this.http.put(this.baseUrl + "/expense/edit_expense", formData);
  }
  deleteExpense(formData) {
    return this.http.delete(
      this.baseUrl + "/expense/delete_expense/" + formData.id
    );
  }
  getSumExpense(groupId) {
    return this.http.post(this.baseUrl + "/expense/get_sum_expense", groupId);
  }
  createComment(formData) {
    return this.http.post(this.baseUrl + "/comments/create_comment", formData);
  }
  getCommentsbyExpId(expense_id) {
    return this.http.get(
      this.baseUrl + "/comments/get_all_comments/" + expense_id
    );
  }
}
