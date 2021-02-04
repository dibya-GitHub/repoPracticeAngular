import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "src/app/service/common/common.service";
import { Utils } from "src/app/shared/utils/utils";
import * as moment from "moment";
import { AuthService } from "src/app/service/common/auth.service";

@Component({
  selector: "app-group-info",
  templateUrl: "./group-info.component.html",
  styleUrls: ["./group-info.component.css"],
})
export class GroupInfoComponent implements OnInit {
  groupForm: FormGroup;
  expensesForm: FormGroup;
  groupName: any;
  groupId: any;
  expenses: any;
  empty: boolean = false;

  todayExpenses: any;
  emptyToday: boolean = false;
  userId: any;
  groupTypeList: any;
  groupType: any;
  currencyCode: any;
  expenseId: any;
  nowDate: any = moment(new Date()).format("YYYY-MM-DD");
  comments: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.groupName = params["group_name"];
      this.groupId = params["id"];
      this.groupType = params["group_type"];
      this.currencyCode = params["currency_code"];

      this.getTodaysExpense(this.groupId);
      this.getExpenseDetailsByGroupId(this.groupId);
      this.createGroup();
      this.createExpenses(this.groupId);
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
      updated_at: [undefined],
    });
  }
  createExpenses(groupId?: any) {
    this.expensesForm = this.fb.group({
      expense_description: [undefined],
      group_id: groupId,
      price: [undefined],
      currency_code: [undefined],
      created_at: [undefined],
      created_by: [undefined],
      updated_at: [undefined],
      updated_by: [undefined],
    });
    this.expensesForm.patchValue({
      created_at: this.nowDate,
    });
  }
  // resetForm() {
  //   this.expensesForm.reset({
  //     created_at: this.nowDate
  //   })
  // }
  getUserId() {
    let userId = this.authService.getUserId();

    this.commonService.getCurrentUserId(userId).subscribe((result: any) => {
      if (result.id) {
        this.userId = result;
      } else {
        this.userId = undefined;
      }
    });
  }
  fetchGroupType() {
    this.commonService.fetchGroupType().subscribe((result: any) => {
      this.groupTypeList = result;
      this.groupForm.patchValue({ group_type: this.groupType });
    });
  }
  getTodaysExpense(groupId) {
    if (groupId) {
      this.commonService
        .getTodaysExpense({ id: groupId })
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.todayExpenses = res.result;
            if (this.todayExpenses.length == 0) {
              this.emptyToday = true;
            }
          }
        });
    }
  }
  getExpenseDetailsByGroupId(groupId) {
    if (groupId) {
      this.commonService
        .getExpenseDetailsByGroupId({ id: groupId })
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.expenses = res.result;
            if (this.expenses.length == 0) {
              this.empty = true;
            }
          }
        });
    }
  }
  deleteGroup(groupId) {
    if (groupId) {
      this.commonService.deleteGroupById(groupId).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.router.navigate(["groups"]);
        }
      });
    }
  }
  onSubmitGroup() {
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
          this.router.navigate(["groups"]);
          // this.fetchAllGroups();
          // this.isLoading = false;
        }
      });
    } else {
      // this.isLoading = false;
      Utils.validateAllFormFields(this.groupForm);
    }
  }
  onSubmitExpense() {
    if (this.expensesForm.valid) {
      // this.isLoading = true;
      let formData = this.expensesForm.getRawValue();
      formData.currency_code = this.currencyCode;
      // formData.created_at = new Date();
      formData.created_by = this.userId.user_name;
      formData.updated_at = new Date();
      formData.updated_by = this.userId.user_name;
      console.log(formData);
      this.commonService.createExpense(formData).subscribe((result: any) => {
        if (result.statusCode) {
          this.router.navigate(["groups"]);
        }
      });
    } else {
      // this.isLoading = false;
      Utils.validateAllFormFields(this.expensesForm);
    }
  }

  onEditExpense() {
    if (this.expensesForm.valid) {
      // this.isLoading = true;
      let formData = this.expensesForm.getRawValue();
      formData.currency_code = this.currencyCode;
      // formData.created_at = new Date();
      // formData.created_by = this.userId.user_name;
      formData.updated_at = new Date();
      formData.updated_by = this.userId.user_name;
      formData._id = this.expenseId;
      console.log(formData);
      this.commonService.editExpense(formData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          window.location.reload();
        }
      });
    } else {
      // this.isLoading = false;
      Utils.validateAllFormFields(this.expensesForm);
    }
  }
  onDeleteExpense() {
    let obj = {
      id: this.expenseId,
    };
    if (obj) {
      this.commonService.deleteExpense(obj).subscribe((result: any) => {
        if (result.statusCode == 200) {
          window.location.reload();
        }
      });
    }
  }
  onClickEachExpense(expense) {
    console.log(expense);
    this.expenseId = expense._id;
    this.expensesForm.patchValue(expense);
    let createdDate = moment(expense.created_at).format("YYYY-MM-DD");
    this.expensesForm.get("created_at").setValue(createdDate);
    this.getCommentsByExpId(expense._id);
  }
  getCommentsByExpId(expense: any) {
    this.commonService.getCommentsbyExpId(expense).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.comments = result.comments;
      }
    });
  }
}
