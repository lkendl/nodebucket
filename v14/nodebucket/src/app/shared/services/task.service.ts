/*
============================================
; Title: nodebucket
; File Name: task.service.ts
; Author: Professor Krasso
; Date: 22 August 2022
; Modified By: Laura Kendl
; Description: "nodebucket is task management software designed to simplify the way you
; create, track, edit, and delete time sensitive material. This is a full-stack
; MEAN (MongoDB, Express, Angular, and Node.js) application, utilizing the concepts that
; were taught in previous courses. MongoDB will be used for data persistence. Node.js
; will be used for manipulating and returning saved records, SoapUI for unit testing,
; and Angular for user interactions" (Krasso, 2022).
===========================================
*/

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  /**
   * findAllTasks
   */
  findAllTasks(empId: string): Observable<any> {
    return this.http.get('api/employees/' + empId + '/tasks');

  }

  /**
   * createTask
   */
  createTask(empId: string, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      // Define HTTP body of request.
      text: task
    })
  }
}
