import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "../../service/common/common.service";
import { Utils } from "src/app/shared/utils/utils";

@Component({
  selector: "app-profile-account",
  templateUrl: "./profile-account.component.html",
  styleUrls: ["./profile-account.component.css"],
})
export class ProfileAccountComponent implements OnInit {
  profileForm: FormGroup;
  currencyList: any;
  currentUser: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.createForm();
    this.getCurrencyList();
    this.getCurrentUser();
  }
  createForm() {
    this.profileForm = this.fb.group({
      name: [undefined, Validators.required],
      nickname: [undefined],
      email: [undefined],
      password: [undefined],
      mobile: [undefined, Validators.required],
      default_currency: [undefined, Validators.required],
      profession: [undefined],
      avatar: [undefined],
    });
  }
  getCurrencyList() {
    this.commonService.currencyList().subscribe((result: any) => {
      this.currencyList = result.currency;
    });
  }

  getCurrentUser() {
    this.commonService.getCurrentUser().subscribe((result: any) => {
      if (result) {
        this.currentUser = result;
        this.profileForm.patchValue(this.currentUser);
        this.profileForm.get("email").disable();
        this.profileForm.get("password").disable();
      }
    });
  }
  onSubmit() {
    if (this.profileForm.valid) {
      let values = this.profileForm.getRawValue();
      delete values.email;
      delete values.password;
      console.log(values);
    } else {
      Utils.validateAllFormFields(this.profileForm);
    }
  }
  onCancel() {
    this.router.navigate(["/"]);
  }
}
