import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/common/auth.service';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private route: Router, private auth: AuthService, private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.isLoggedInMessage.subscribe(message => this.isLoggedIn = message);
  }
  signOut() {
    sessionStorage.clear();
    this.auth.clearToken();
    this.route.navigate(['login']);
    this.sendStatusIsLoggedIn(false)
  }
  sendStatusIsLoggedIn(isLoggedIn) {
    this.commonService.checkIsLoggedIn(isLoggedIn);
  }
}
