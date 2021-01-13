import { Component, OnInit } from '@angular/core';
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService

  ) { }

  ngOnInit() {
    this.fetchAllGroups();
    this.fetchGroupType();
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
      this.groupList = result.group;
      if (this.groupList.length > 0) {
        this.empty = false;
      } else {
        this.empty = true;
      }
    })
  }
}
