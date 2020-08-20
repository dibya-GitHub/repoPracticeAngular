import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/common/auth.service';
import { CommonService } from '../service/common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private route: Router, private auth: AuthService, private commonService: CommonService) { }

  ngOnInit() {
    console.log(sessionStorage.getItem('isLoggedIn'));
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
