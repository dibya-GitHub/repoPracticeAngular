import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isBusy:boolean;
  constructor() {
    this.isBusy = false;
  }
}
