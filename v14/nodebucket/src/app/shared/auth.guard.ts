/*
============================================
; Title: nodebucket
; File Name: auth.guard.ts
; Author: Professor Krasso
; Date: 18 August 2022
; Modified By: Laura Kendl
; Description: "nodebucket is task management software designed to simplify the way you
; create, track, edit, and delete time sensitive material. This is a full-stack
; MEAN (MongoDB, Express, Angular, and Node.js) application, utilizing the concepts that
; were taught in previous courses. MongoDB will be used for data persistence. Node.js
; will be used for manipulating and returning saved records, SoapUI for unit testing,
; and Angular for user interactions" (Krasso, 2022).
===========================================
*/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Pull cookie from browser.
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // Assign sessionUser the response from the cookieService.get('session_user') call.
      const sessionUser = this.cookieService.get("session_user");

      // If sessionUser has information, let user login.
      if (sessionUser) {
        return true;
      } else {
        // Redirect to login screen if no session information.
        this.router.navigate(['/session/login']);
        return false;
      }
    }
}
