import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorMaintainanceComponent } from "./components/error-maintainance/error-maintainance.component";
import { Error404Component } from "./components/error404/error404.component";
import { Error500Component } from "./components/error500/error500.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/" },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
