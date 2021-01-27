import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/common/auth.service';
import { CommonService } from './service/common/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Equally';
  isLoggedIn: Boolean;
  currentUser: any;

  constructor(
    private route: Router,
    private auth: AuthService,
    public location: Location,
    private commonService: CommonService,
  ) {

  }
  ngOnInit() {

  }
  removeCommon() {
    let routerLink = this.location.prepareExternalUrl(this.location.path());
    routerLink = routerLink.slice(1);
    if (routerLink === '/sign-in' || routerLink === '/sign-up' || routerLink === '/forgot-password' || routerLink === '/error-maintainance' || routerLink === '/error404' || routerLink === '/error500') {
      return false;
    }
    else {
      return true;
    }
  }
}
