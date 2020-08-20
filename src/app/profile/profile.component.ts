import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/common/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    console.log(this.auth.isLoggedIn)
  }

}
