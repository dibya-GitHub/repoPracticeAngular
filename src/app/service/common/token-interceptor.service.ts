import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private commonService: CommonService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) { }
  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const urlValue = (req.url.indexOf("login") > -1 || req.url.indexOf("signup") > -1);
    let loginhistory = req.url.indexOf("login-histories") > -1;
    if (loginhistory) {
      req = req.clone({ setHeaders: { Authorization: token } });
    } else if (urlValue === true) {

    } else {
      req = req.clone({
        setHeaders: {
          Accept: 'application/json',
          Authorization: token
        },
        withCredentials: true
      });
    }
    this.ngxService.stop();
    return req;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ngxService.start();
    let authToken = this.commonService.getAuthToken();
    let authReq = req;

    return next.handle(this.addToken(authReq, authToken))
      .pipe(tap((event: HttpEvent<any>) => {
      }, (err: any) => {
        if (err.status === 500) {
          console.log("Error--", err);

        }
      }));
  }
  openSnackBar(msg) {
    this._snackBar.open(msg, 'End now', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
