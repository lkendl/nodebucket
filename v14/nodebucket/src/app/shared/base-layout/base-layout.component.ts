/*
============================================
; Title: nodebucket
; File Name: base-layout.component.ts
; Author: Professor Krasso
; Date: 16 August 2022
; Modified By: Laura Kendl
; Description: "nodebucket is task management software designed to simplify the way you
; create, track, edit, and delete time sensitive material. This is a full-stack
; MEAN (MongoDB, Express, Angular, and Node.js) application, utilizing the concepts that
; were taught in previous courses. MongoDB will be used for data persistence. Node.js
; will be used for manipulating and returning saved records, SoapUI for unit testing,
; and Angular for user interactions" (Krasso, 2022).
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  sessionName: string;
  year: number;

  constructor(private cookieService: CookieService, private router: Router) {
  this.sessionName = this.cookieService.get('session_name');
  this.year = Date.now();
}
  ngOnInit(): void {
  }

  // Call the cookieService.deleteAll function and then use the Router to navigate users to the login page.
  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/login'])
  }
}
