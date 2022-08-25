/*
============================================
; Title: nodebucket
; File Name: home.component.ts
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
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from 'src/app/shared/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: string;
  sessionName: string;

  taskForm: FormGroup = this.fb.group({

    task: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])]
  })

  constructor(private fb: FormBuilder, private cookieService: CookieService, private taskService: TaskService) {
    // Initialize the variables.
    this.empId = this.cookieService.get('session_user'), 10;
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];
    this.sessionName = this.cookieService.get('session_name');

    // Subscribe to the taskService observable (task.service.ts).
    this.taskService.findAllTasks(this.empId).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);

      },
      error: (e) => {
        console.log(e.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    })
   }

  ngOnInit(): void {
  }

  // Create function to create a task.

  createTask() {
    const newTask = this.taskForm.controls['task'].value;

    // Call service
    this.taskService.createTask(this.empId, newTask).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
        this.taskForm.controls['task'].setErrors({'incorrect': false}); // Clears errors in form.
      }
    })
  }
}
