import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/common/auth.service";
import { CommonService } from "src/app/service/common/common.service";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "src/app/service/common/loader.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(
    private route: Router,
    private auth: AuthService,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.commonService.isLoggedInMessage.subscribe(
      (message) => (this.isLoggedIn = message)
    );
  }
  signOut() {
    this.loaderService.isBusy = true;
    sessionStorage.clear();
    this.auth.clearToken();
    this.route.navigate(["sign-in"]);
    this.sendStatusIsLoggedIn(false);
    this.toastrService.success("Successfully Logout");
    this.loaderService.isBusy = false;
  }
  sendStatusIsLoggedIn(isLoggedIn) {
    this.commonService.checkIsLoggedIn(isLoggedIn);
  }
}
