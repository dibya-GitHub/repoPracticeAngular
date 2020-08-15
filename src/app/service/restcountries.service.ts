import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, CanDeactivate, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestcountriesService implements CanActivate, CanActivateChild {

  private _countriesurl = 'https://restcountries.eu/rest/v2/all';
  constructor(private _http: HttpClient) { }

  getCountries() {
    return this._http.get(this._countriesurl);
  }
  canActivate() {
    console.log("CanActivate");
    return true;
  }
  canActivateChild() {
    console.log("CanActivate");
    return true;
  }
}
