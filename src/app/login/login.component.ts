import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ValidationHelperService } from '../shared/services/validate-helper.service'
import { CommonService } from '../service/common/common.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from '../service/common/auth.service';
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isLoggedIn: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validationHelper: ValidationHelperService,
    private commonService: CommonService,
    private _snackBar: MatSnackBar,
    private auth: AuthService

  ) { }

  ngOnInit() {
    this.createLoginForm();
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmitLogin() {
    if (this.loginForm.valid) {
      let values = this.loginForm.value;
      this.commonService.login(values).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.auth.setLoginInfo(res.token);
          this.router.navigate(['/profile']);
          $("#loginModalForm").modal("hide");
          $("#registerModalForm").modal("hide");
          this.loginForm.reset();
          this.sendStatusIsLoggedIn(true);
          this.commonService.isLoggedInMessage.subscribe(message => this.isLoggedIn = message)
        }
      }, error => {
        console.log(error);
        this.openSnackBar(error.statusText);
      })
    } else {
      this.validationHelper.validateAllFormFields(this.loginForm);
    }
  }
  sendStatusIsLoggedIn(isLoggedIn) {
    this.commonService.checkIsLoggedIn(isLoggedIn);
  }
  onResetLogin() {
    this.loginForm.reset();
  }
  onSubmitRegister() {
    if (this.registerForm.valid) {
      let values = this.registerForm.value;
      this.commonService.register(values).subscribe((res: any) => {
        if (res.statusCode === 200) {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem("userData", JSON.stringify(res.userData));
          this.router.navigate(['/profile']);
          this.openSnackBar(res.statusMessage);
          $("#loginModalForm").modal("hide");
          $("#registerModalForm").modal("hide");
          this.registerForm.reset();
          this.isLoggedIn = true;
        }
      }, error => {
        console.log(error);
        this.openSnackBar(error.error.msg);
      })
    } else {
      this.validationHelper.validateAllFormFields(this.registerForm);
    }
  }
  onResetRegister() {
    this.registerForm.reset();
  }
  openSnackBar(msg) {
    this._snackBar.open(msg, 'End now', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
