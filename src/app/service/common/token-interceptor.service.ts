import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { Router, ActivatedRoute } from "@angular/router";

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private commonService: CommonService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isLogin = req.url.includes('/login');
    if (!isLogin) {
      const token = this.commonService.getAuthToken();
      if (token) {
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Authorization': token
        });
        //   if (token) {
        //     reqHeader = reqHeader.append('token', token);
        //   }
        const authReq = req.clone({ headers: reqHeader });
        return next.handle(authReq);
      } else {
        this.openSnackBar('Client is not Autherized');
        this.router.navigate(['/login']);
      }
    } else {
      return next.handle(req);
    }
  }
  openSnackBar(msg) {
    this._snackBar.open(msg, 'End now', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
