/*
============================================
; Title: nodebucket
; File Name: session.service.ts
; Author: Professor Krasso
; Date: 17 August 2022
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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

/**
 * findEmployeeById
 */
// Define the service that calls the node.js API. Pass the empId that returns an observable.
  findEmployeeById(empId: number): Observable<any> {
    // Pass the empId and append it to the /api/employees route.
    return this.http.get('/api/employees/' + empId) // Any future changes to the route (e.g. version changes: "/api/v2/employees") will be implemented here.
  }
}
