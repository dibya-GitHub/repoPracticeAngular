import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common/common.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groupList: any;
  empty: boolean = true;
  groupTypeList: any;
  groupForm: FormGroup;
  userId: any;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
  ) {
  }

  ngOnInit() {
    this.getUserId();
    this.createGroup();
    this.fetchAllGroups();
    this.fetchGroupType();
  }
  createGroup() {
    console.log(this.userId);

    this.groupForm = this.fb.group({
      group_name: [undefined],
      group_type: [undefined],
      group_avatar: [undefined],
      belongs_to: [undefined],
      created_by: [undefined],
      created_at: [undefined],
      updated_by: [undefined],
      updated_at: [undefined]
    })
  }
  getUserId() {
    this.commonService.getCurrentUserId().subscribe((result: any) => {
      if (result.id) {
        this.userId = result;
      } else {
        this.userId = undefined;
      }
    })
  }
  onSubmit() {
    if (this.groupForm.valid) {
      this.isLoading = true;
      let formData = this.groupForm.getRawValue();
      formData.belongs_to = this.userId.id;
      formData.created_at = new Date();
      formData.created_by = this.userId.user_name;
      formData.updated_at = new Date();
      formData.updated_by = this.userId.user_name;
      console.log(formData);
      this.commonService.createGroup(formData).subscribe((result: any) => {
        if (result.statusCode) {
          console.log(result.statusText);
          this.fetchAllGroups();
          this.isLoading = false;

        }
      })
    } else {
      this.isLoading = false;
      Utils.validateAllFormFields(this.groupForm);
    }
  }
  fetchGroupType() {
    this.commonService.fetchGroupType().subscribe((result: any) => {
      this.groupTypeList = result;
    })
  }
  createNewGroup() {

  }
  fetchAllGroups() {
    this.commonService.fetchAllGroups().subscribe((result: any) => {
      this.groupList = result;
      if (this.groupList.length > 0) {
        this.empty = false;
      } else {
        this.empty = true;
      }
    })
  }
  chooseGroup(id) {
    let itemId = { "id": id }
    if (itemId != undefined) {
      this.commonService.getGroupInfoById(itemId).subscribe((result: any) => {
        console.log(result);
        if (result) {
          this.router.navigate(['group-info'], { queryParams: { id: result._id, group_name: result.group_name, group_type: result.group_type }, skipLocationChange: true })
        }
      })
    }
  }
}
