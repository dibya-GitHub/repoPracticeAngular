import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ParentComponent } from "./parent/parent.component";
import { RestcountriesService } from "./service/restcountries.service";
import { SignupComponent } from "./signup/signup.component";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";
import { CreateEmployeeComponent } from "./employee/create-employee/create-employee.component";
import { EmployeeDetailsComponent } from "./employee/employee-details/employee-details.component";
import { UpdateEmployeeComponent } from "./employee/update-employee/update-employee.component";
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/dashboard" },
  {
    path: "country",
    pathMatch: "full",
    component: ParentComponent, canActivate: [RestcountriesService],
  },
  { path: "dashboard", pathMatch: "full", component: DashboardComponent },
  { path: "login", pathMatch: "full", component: LoginComponent },
  { path: "signup", pathMatch: "full", component: SignupComponent },
  {
    path: "employee",
    pathMatch: "full",
    component: EmployeeListComponent,
  },
  {
    path: "employee/add",
    pathMatch: "full",
    component: CreateEmployeeComponent,
  },
  { path: "update/:id", component: UpdateEmployeeComponent },
  { path: "details/:id", component: EmployeeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
