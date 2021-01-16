import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(
    private commonService: CommonService,
    private router: Router
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
    return req;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
}
