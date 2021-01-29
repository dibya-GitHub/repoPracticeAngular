import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ActivityComponent } from './components/activity/activity.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorMaintainanceComponent } from './components/error-maintainance/error-maintainance.component';
import { Error404Component } from './components/error404/error404.component';
import { Error500Component } from './components/error500/error500.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ProfileAccountComponent } from './components/profile-account/profile-account.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CommonService } from './service/common/common.service';
import { TokenInterceptorService } from './service/common/token-interceptor.service';
import { FooterComponent } from './shared/component/footer/footer.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { BlockCopyPasteDirective } from "./shared/directives/block-copy-paste.directive";
import { MycurrencyDirective } from './shared/directives/mycurrency.directive';
import { NoDecimalDirective } from './shared/directives/no-decimal.directive';
import { NumberonlyDirective } from "./shared/directives/number-only.directive";
import { PercentageDirective } from './shared/directives/percentage.directive';
import { ValidationHelperService } from "./shared/services/validate-helper.service";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GroupInfoComponent } from './components/group-info/group-info.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NoDecimalDirective,
    PercentageDirective,
    MycurrencyDirective,
    AutofocusDirective,
    NumberonlyDirective,
    BlockCopyPasteDirective,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ErrorMaintainanceComponent,
    Error404Component,
    Error500Component,
    ProfileAccountComponent,
    DashboardComponent,
    ActivityComponent,
    GroupsComponent,
    GroupInfoComponent,
    NavigationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NgxLoadingModule,
		ToastrModule.forRoot({
		timeOut: 5000,
		positionClass: 'toast-top-right'
		}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    ValidationHelperService,
    CommonService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
