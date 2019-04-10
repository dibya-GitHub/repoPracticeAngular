import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { ParentComponent } from './parent/parent.component';
import { RestcountriesService } from './service/restcountries.service';
import {MapComponent} from './map/map.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'country', pathMatch: 'full', component: ParentComponent, canActivate: [RestcountriesService] },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'signup', pathMatch: 'full', component: SignupComponent },
  { path: 'rangeSlider', pathMatch: 'full', component: RangeSliderComponent },
  { path: 'map', pathMatch: 'full', component: MapComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
