import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityComponent } from "./components/activity/activity.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ErrorMaintainanceComponent } from "./components/error-maintainance/error-maintainance.component";
import { Error404Component } from "./components/error404/error404.component";
import { Error500Component } from "./components/error500/error500.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ProfileAccountComponent } from "./components/profile-account/profile-account.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard"
  },
  {
    path: "dashboard",
    pathMatch: "full",
    component: DashboardComponent,
  },
  {
    path: "sign-in",
    pathMatch: "full",
    component: SigninComponent,
  },
  {
    path: "sign-up",
    pathMatch: "full",
    component: SignupComponent,
  },
  {
    path: "forgot-password",
    pathMatch: "full",
    component: ForgotPasswordComponent,
  },
  {
    path: "error-maintainance",
    pathMatch: "full",
    component: ErrorMaintainanceComponent,
  },
  {
    path: "error404",
    pathMatch: "full",
    component: Error404Component,
  },
  {
    path: "error500",
    pathMatch: "full",
    component: Error500Component,
  },
  {
    path: "profile",
    pathMatch: "full",
    component: ProfileAccountComponent,
  },
  {
    path: "activity",
    pathMatch: "full",
    component: ActivityComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
