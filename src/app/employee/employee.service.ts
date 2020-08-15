import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getEmployee(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}` + "/employee/" + `/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + "/employee/", employee);
  }

  updateEmployee(value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + "/employee", value);
  }

  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + "/employee/" + `${id}`);
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + "/employee/list");
  }
}
