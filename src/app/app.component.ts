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
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (titlee === 'sign-in' || titlee === 'sign-up' || titlee === 'forgot-password' || titlee === 'error-maintainance' || titlee === 'error404' || titlee === 'error500') {
      return false;
    }
    else {
      return true;
    }
  }
}
