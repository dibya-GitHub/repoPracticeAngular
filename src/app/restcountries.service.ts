import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestcountriesService {

  private _countriesurl='https://restcountries.eu/rest/v2/all';
  constructor(private _http: HttpClient){}
  
  getCountries(){
     return this._http.get(this._countriesurl);
  }
}
