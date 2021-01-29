import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";
import { AuthService } from "src/app/service/common/auth.service";
import { CommonService } from "src/app/service/common/common.service";
import { LoaderService } from "./../../service/common/loader.service";
import { ValidationHelperService } from "./../../shared/services/validate-helper.service";
import { ToastrService } from "ngx-toastr";
import { Utils } from "src/app/shared/utils/utils";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private validationHelper: ValidationHelperService,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.createform();
  }

  createform() {
    this.loginForm = this.fb.group({
      email: [
        "softwaredibya@gmail.com",
        [Validators.required, Validators.email],
      ],
      password: ["admin@gmail.com", Validators.required],
    });
  }
  login() {
    this.loaderService.isBusy = true;
    if (this.loginForm.valid) {
      const form = this.loginForm.value;
      const val = form.password;
      const rkEncryptionKey = CryptoJS.enc.Base64.parse(
        "u/Hu5posvwDsXUnV5Zaq4h=="
      );
      const rkEncryptionIv = CryptoJS.enc.Base64.parse(
        "5D9r9ZVzEYYgha90/aUK2w=="
      );
      const utf8Stringified = CryptoJS.enc.Utf8.parse(val);
      const encrypted = CryptoJS.AES.encrypt(
        utf8Stringified.toString(),
        rkEncryptionKey,
        {
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          iv: rkEncryptionIv,
        }
      );
      const encryptedPwd = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

      let obj = {
        email: form.email,
        password: encryptedPwd,
      };
      console.log(obj);
      this.commonService.login(obj).subscribe(
        (data) => {
          this.loginForm.reset();
          this.auth.setLoginInfo(data);
          this.commonService.getUserProfile().subscribe((resp) => {});
          this.router.navigate(["dashboard"]);
          this.loaderService.isBusy = false;
        },
        (error) => {
          this.loaderService.isBusy = false;
          this.toastrService.error(error.error.error);
        }
      );
    } else {
      Utils.validateAllFormFields(this.loginForm);
      this.toastrService.error("Please fill mandatory fields");
      this.loaderService.isBusy = false;
    }
  }
}
