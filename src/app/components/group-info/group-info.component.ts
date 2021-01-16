import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common/common.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css']
})
export class GroupInfoComponent implements OnInit {
  groupForm: FormGroup;
  groupName: any;
  groupId: any;
  expenses: any;
  empty: boolean = false;

  todayExpenses: any;
  emptyToday: boolean = false;
  userId: any;
  groupTypeList: any;
  groupType: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,

  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.groupName = params['group_name'];
      this.groupId = params['id'];
      this.groupType = params['group_type'];

      this.getTodaysExpense(this.groupId);
      this.getExpenseDetailsByGroupId(this.groupId);
      this.createGroup();
      console.log(params);
      console.log(this.groupName);
      this.getUserId();
      this.fetchGroupType();
    });
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
  fetchGroupType() {
    this.commonService.fetchGroupType().subscribe((result: any) => {
      this.groupTypeList = result;
      this.groupForm.patchValue({ group_type: this.groupType })
    })
  }
  getTodaysExpense(groupId) {
    if (groupId) {
      this.commonService.getTodaysExpense({ id: groupId }).subscribe((res: any) => {
        console.log(res);
        if (res.statusCode == 200) {
          this.todayExpenses = res.result;
          if (this.todayExpenses.length == 0) {
            this.emptyToday = true;
          }
        }
      })
    }
  }
  getExpenseDetailsByGroupId(groupId) {
    if (groupId) {
      this.commonService.getExpenseDetailsByGroupId({ id: groupId }).subscribe((res: any) => {
        console.log(res);
        if (res.statusCode == 200) {
          this.expenses = res.result;
          if (this.expenses.length == 0) {
            this.empty = true;
          }
        }
      })
    }
  }
  deleteGroup(groupId) {
    if (groupId) {
      this.commonService.deleteGroupById(groupId).subscribe((result: any) => {
        console.log(result);
        if (result.statusCode == 200) {
          this.router.navigate(['groups']);
        }
      })
    }
  }
  onSubmit() {
    if (this.groupForm.valid) {
      // this.isLoading = true;
      let formData = this.groupForm.getRawValue();
      formData.belongs_to = this.userId.id;
      formData.updated_at = new Date();
      formData.updated_by = this.userId.user_name;
      formData.group_id = this.groupId;
      console.log(formData);
      this.commonService.editGroup(formData).subscribe((result: any) => {
        if (result.statusCode) {
          console.log(result.statusText);
          // this.fetchAllGroups();
          // this.isLoading = false;

        }
      })
    } else {
      // this.isLoading = false;
      Utils.validateAllFormFields(this.groupForm);
    }
  }
}
