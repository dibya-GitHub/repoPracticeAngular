import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateEmployeeComponent } from "./employee/create-employee/create-employee.component";
import { EmployeeDetailsComponent } from "./employee/employee-details/employee-details.component";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";
import { UpdateEmployeeComponent } from "./employee/update-employee/update-employee.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from "./signup/signup.component";
import { AuthGuard } from './service/common/auth.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/" },
  { path: "login", pathMatch: "full", component: LoginComponent },
  { path: "signup", pathMatch: "full", component: SignupComponent },
  { path: "profile", pathMatch: "full", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "employee",
    pathMatch: "full",
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employee/add",
    pathMatch: "full",
    component: CreateEmployeeComponent,
    canActivate: [AuthGuard]
  },
  { path: "update/:id", component: UpdateEmployeeComponent, canActivate: [AuthGuard] },
  { path: "details/:id", component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
