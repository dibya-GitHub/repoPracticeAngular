import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { ChildComponent } from './parent/child/child.component';
import { ParentComponent } from './parent/parent.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { RestcountriesService } from './service/restcountries.service';
import { ValidationHelperService } from "./shared/services/validate-helper.service";
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    RangeSliderComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RestcountriesService,ValidationHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
