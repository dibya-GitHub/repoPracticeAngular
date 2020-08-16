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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validationHelper: ValidationHelperService,
    private commonService: CommonService,
    private _snackBar: MatSnackBar
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
          sessionStorage.setItem('token', res.token);
          this.router.navigate(['/employee']);
        }
      }, error => {
        console.log(error);
        this.openSnackBar(error.statusText);
      })

    } else {
      this.validationHelper.validateAllFormFields(this.loginForm);
    }
  }
  onResetLogin() {
    this.loginForm.reset();
  }
  onSubmitRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
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
