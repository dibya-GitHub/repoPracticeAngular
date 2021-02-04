import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";
import { AuthService } from "src/app/service/common/auth.service";
import { CommonService } from "src/app/service/common/common.service";
import { LoaderService } from "./../../service/common/loader.service";
import { ToastrService } from "ngx-toastr";
import { Utils } from "src/app/shared/utils/utils";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.createform();
  }
  createform() {
    this.signUpForm = this.fb.group({
      name: [""],
      email: [
        "softwaredibya@gmail.com",
        [Validators.required, Validators.email],
      ],
      password: ["admin@gmail.com", Validators.required],
    });
  }
  signUp() {
    this.loaderService.isBusy = true;
    if (this.signUpForm.valid) {
      const form = this.signUpForm.value;
      let obj = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      console.log(obj);
      this.commonService.register(obj).subscribe(
        (data: any) => {
          if (data.statusCode == 200) {
            this.toastrService.success(data.statusText);
            this.auth.setLoginInfo(data);
            this.commonService.getUserProfile().subscribe((resp) => {
              console.log(resp);
            });
            this.router.navigate(["dashboard"]);
            this.loaderService.isBusy = false;
          }
        },
        (error) => {
          this.loaderService.isBusy = false;
          this.toastrService.error(error.error.error);
        }
      );
      this.loaderService.isBusy = false;
    } else {
      Utils.validateAllFormFields(this.signUpForm);
      this.toastrService.error("Please fill mandatory fields");
      this.loaderService.isBusy = false;
    }
  }
}
