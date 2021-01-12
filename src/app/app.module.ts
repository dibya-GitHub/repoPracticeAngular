import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from './shared/component/footer/footer.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { CommonService } from './service/common/common.service';
import { TokenInterceptorService } from './service/common/token-interceptor.service';
import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { MycurrencyDirective } from './shared/directives/mycurrency.directive';
import { NoDecimalDirective } from './shared/directives/no-decimal.directive';
import { NumberDigitDirective } from './shared/directives/number-digit.directive';
import { PercentageDirective } from './shared/directives/percentage.directive';
import { ValidationHelperService } from "./shared/services/validate-helper.service";
import { NgSelectModule } from '@ng-select/ng-select';
import { NumberonlyDirective } from "./shared/directives/number-only.directive";
import { BlockCopyPasteDirective } from "./shared/directives/block-copy-paste.directive";
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ErrorMaintainanceComponent } from './components/error-maintainance/error-maintainance.component';
import { Error404Component } from './components/error404/error404.component';
import { Error500Component } from './components/error500/error500.component';
import { ProfileAccountComponent } from './components/profile-account/profile-account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivityComponent } from './components/activity/activity.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsOpacity: 0.5,
  bgsPosition: "bottom-right",
  bgsSize: 60,
  bgsType: "ball-spin-clockwise",
  blur: 5,
  fgsColor: "#f2fe00",
  fgsPosition: "center-center",
  fgsSize: 60,
  fgsType: "three-strings",
  gap: 24,
  logoPosition: "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(40, 40, 40, 0.8)",
  pbColor: "#ff0430",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "Loading...",
  textColor: "#ffffff",
  textPosition: "center-center",
};
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NumberDigitDirective,
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
    ActivityComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgSelectModule
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
