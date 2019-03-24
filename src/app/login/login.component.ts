import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validEmail: string = "showsibu@gmail.com";
  validPass: string = "111111";
  loginForm: FormGroup;
  submitted: boolean = false;
  isLogin: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }
  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);
    sessionStorage.setItem('email', this.loginForm.value.email);
    sessionStorage.setItem('password', this.loginForm.value.password);
    this.goToLink();
  }
  goToLink() {
    let sessionEmail = sessionStorage.getItem('email');
    let sessionPass = sessionStorage.getItem('password');
    if (sessionEmail === this.validEmail) {
      if (sessionPass === this.validPass) {
        this.isLogin = true;
        sessionStorage.setItem('isLogin', this.isLogin.toString());

        console.log(this.isLogin);
        this.router.navigate(['/']);
      }
    }

  }
}
