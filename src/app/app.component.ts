import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from './service/common/auth.service';
import { Router } from '@angular/router';

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
    private auth: AuthService
  ) {

  }
  ngOnInit() {
    console.log(this.auth.isLoggedIn)
  }
}
