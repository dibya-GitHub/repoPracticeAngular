import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common/common.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css']
})
export class ProfileAccountComponent implements OnInit {
  profileForm: FormGroup;
  currencyList: any;
  currentUser: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getCurrencyList();
    this.getCurrentUser();
  }
  createForm() {
    this.profileForm = this.fb.group({
      name: [undefined],
      nickname: [undefined],
      email: [undefined],
      password: [undefined],
      mobile: [undefined],
      default_currency: [undefined],
      profession: [undefined],
      avatar: [undefined],
    })
  }
  getCurrencyList() {
    this.commonService.currencyList().subscribe((result: any) => {
      this.currencyList = result.currency;
    })
  }

  getCurrentUser() {
    this.commonService.getCurrentUser().subscribe((result: any) => {
      if (result) {
        this.currentUser = result;
        this.profileForm.patchValue(this.currentUser)
      }
    })
  }
  onSubmit() {
    if (this.profileForm.valid) {
      let values = this.profileForm.value;

    } else {
      Utils.validateAllFormFields(this.profileForm);
    }
  }
  onCancel() {
    this.router.navigate(['/'])
  }
}
