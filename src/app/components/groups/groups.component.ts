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

    this.groupForm = this.fb.group({
      group_name: [undefined],
      group_type: [undefined],
      group_avatar: [undefined],
      belongs_to: [undefined],
      created_by: [undefined],
      created_at: [undefined],
      updated_by: [undefined],
      updated_at: [undefined],
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
      this.commonService.createGroup(formData).subscribe((result: any) => {
        if (result.statusCode) {
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
        this.groupList.forEach(element => {
          element.sum = 0;
          element.count = 0;
          this.getGroupExpense({ id: element._id });
        });

        this.empty = false;
      } else {
        this.empty = true;
      }
    })
  }
  getGroupExpense(groupId) {
    var arr = [];
    var sumObj;
    this.commonService.getSumExpense(groupId).subscribe((result: any) => {
      sumObj = { sum: result.result, count: result.count };
      arr.push(sumObj);
    })
    console.log(arr);
    // if (this.sumObj) {
    //   this.groupList.forEach((value, idx) => {
    //     value.sum = this.sumObj.sum;
    //     value.count = this.sumObj.count;
    //   });
    // }

    // console.log(this.groupList);

  }
  chooseGroup(id) {
    let itemId = { "id": id }
    if (itemId != undefined) {
      this.commonService.getGroupInfoById(itemId).subscribe((result: any) => {
        if (result) {
          this.router.navigate(['group-info'], { queryParams: { id: result._id, group_name: result.group_name, group_type: result.group_type, currency_code: 'INR' }, skipLocationChange: false })
        }
      })
    }
  }
}
