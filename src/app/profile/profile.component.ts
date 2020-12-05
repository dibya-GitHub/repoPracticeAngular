import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../service/common/auth.service';
import { CommonService } from '../service/common/common.service';
import { Utils } from '../shared/utils/utils';
import { ValidatePattern } from '../shared/utils/validate-pattern';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileFrom: FormGroup;
  countryList: any;
  zoneList: any;
  profileId: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  addressTypeList: any = [{ "id": null, "description": "Select Address Type" }, { "id": "1", "description": "Home" }, { "id": "2", "description": "Office" }];
  constructor(
    private auth: AuthService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.profileFrom = this.fb.group({
      firstName: [undefined, Validators.required],
      lastName: [undefined],
      email: [undefined, [Validators.required, Validators.pattern(ValidatePattern.EMAIL)]],
      userName: [undefined, Validators.required],
      country: [undefined, Validators.required],
      state: [undefined, Validators.required],
      city: [undefined, Validators.required],
      pinCode: [undefined, Validators.required],
      address1: [undefined, Validators.required],
      address2: [undefined],
      mobileNo: [undefined, [Validators.required, Validators.pattern(ValidatePattern.NUMBER)]],
      addType: [undefined, Validators.required],
      _id: "",
    });
    this.getProfileData();
    this.getCountryList();
  }
  getProfileData() {
    this.commonService.getUserProfile().subscribe((res: any) => {
      this.profileId = res.userData.id;
      if (this.profileId) {
        this.commonService.getProfileMe().subscribe((data: any) => {
          let userData = data.userData;
          console.log(userData)
          this.profileFrom.patchValue({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            userName: userData.username,
            country: (userData.hasOwnProperty('country') ? Number(userData.country) : null),
            state: (userData.hasOwnProperty('state') ? Number(userData.state) : null),
            city: (userData.hasOwnProperty('city') ? Number(userData.city) : null),
            pinCode: userData.pinCode,
            address1: userData.address1,
            address2: userData.address2,
            mobileNo: userData.mobileNo,
            addType: userData.addType,
          });
        });
      }
    });
  }
  getCountryList() {
    this.commonService.countryList().subscribe((res: any) => {
      this.countryList = res.countryList;
      this.countryList.unshift({ "country_id": null, "name": "Choose Country" });
    });

  }
  onChangeCountryGetState(event) {
    let country_id = event.country_id;
    if (country_id != undefined || country_id != "" || country_id != null) {
      this.commonService.zoneList(country_id).subscribe((res: any) => {
        this.zoneList = res.stateList;
        this.zoneList.unshift({ "zone_id": null, "name": "Choose Zone" });
      });
    } else {
      this.profileFrom.patchValue({ state: null })
    }
  }
  save() {
    if (this.profileFrom.valid) {
      let profileData = this.profileFrom.getRawValue();
      profileData._id = this.profileId;
      this.commonService.updateProfile(profileData).subscribe(resp => {
        this.openSnackBar("Updated Successfully!");
      }, error => {
        this.openSnackBar("Error in update!");
      })
    } else {
      Utils.validateAllFormFields(this.profileFrom);
    }
  }
  reset() {

  }
  openSnackBar(msg) {
    this._snackBar.open(msg, 'End now', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
