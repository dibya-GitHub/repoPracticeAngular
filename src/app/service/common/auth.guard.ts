import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let token = sessionStorage.getItem("token");
    if (token) {
      if (state.url == "/sign-in") {
        this.router.navigate(["/dashboard"]);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}
