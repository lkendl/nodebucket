/*
============================================
; Title: nodebucket
; File Name: login.component.ts
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Employee } from '../../shared/models/employee.interface';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessages: Message[] = [];

  // Create employee variable to store the login information.
  employee: Employee;

  // Use the FormBuilder to create a new FormGroup with one FormControl named empId.
  loginForm: FormGroup = this.fb.group({

    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])] // Adds Angular's built-in Validator to the form.
  })

  // Add dependency injections for FormBuilder, Router, cookieService and sessionService.
  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private sessionService: SessionService) {

    // this.fb = new FormBuilder(); <- dependency injection

    // Define Employee object as an empty Employee object.
    this.employee = {} as Employee;

  }

  ngOnInit(): void {
  }

  login() {
    // Get empId input value from form.
    const empId = this.loginForm.controls['empId'].value;

    console.log(empId);

    // Call API and subscribe to event.
    this.sessionService.findEmployeeById(empId).subscribe({

      next: (res) => {
        // If there is a value inside emp, it will be true here. If true, add to cookie service. Use .data property from the baseResponse object.
        if (res.data) {

          // Store response data inside the empty employee object.
          this.employee = res.data;
          // Give cookie. 1 specifies one day.
          this.cookieService.set('session_user', this.employee.empId, 1); // Note: If this.employee.empId gives error: type 'number' is not assignable to parameter of type 'string', change to string: this.employee.empId.toString()

          // Add another cookie for session name. Destroy cookie after one day.
          this.cookieService.set('session_name', `${this.employee.firstName} ${this.employee.lastName}`, 1);

          // Add another cookie for session name. Destroy cookie after one day.
          this.cookieService.set('session_first_name', `${this.employee.firstName}`, 1);

          // Give user access to the root of the application.
          this.router.navigate(['/']);

        // If invalid value is entered, show error message.
        } else {
          this.errorMessages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: res.message // Displays server error message.
            }
          ]
        }
      },
      error: (e) => {
        console.log(e);
        this.errorMessages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: e.data // Displays catch(e) object.
          }
        ]
      }
     })
  }
}
