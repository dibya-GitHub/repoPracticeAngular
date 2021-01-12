import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from './service/common/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'elearnweb';
  isLoggedIn: Boolean;

  constructor(
    private ngxService: NgxUiLoaderService,
    private route: Router,
    private auth: AuthService,
    public location: Location
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
