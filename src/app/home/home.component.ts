import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin: string;
  constructor() { }

  ngOnInit() {
    sessionStorage.setItem('isLogin', 'false');
    setTimeout(() => {
      this.logInFn();
    }, 1000);

  }
  logInFn() {
    this.isLogin = sessionStorage.getItem('isLogin');
    if (this.isLogin) {
      console.log(this.isLogin);
    }
  }
  logOut() {
    this.isLogin = 'false';
  }

}
