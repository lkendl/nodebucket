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
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../shared/models/dialog-data.interface';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: Employee;
  todo: Item[];
  doing: Item[];
  done: Item[];
  empId: string;
  sessionName: string;

  taskForm: FormGroup = this.fb.group({

    task: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])]
  })

  constructor(private fb: FormBuilder, private cookieService: CookieService, private taskService: TaskService, private dialog: MatDialog) {
    // Initialize the variables.
    this.empId = this.cookieService.get('session_user'), 10;
    this.employee = {} as Employee;
    this.todo = [];
    this.doing = [];
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
        this.doing = this.employee.doing;
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
        this.doing = this.employee.doing;
        this.done = this.employee.done;
        this.taskForm.controls['task'].setErrors({'incorrect': false}); // Clears errors in form.
      }
    })
  }

// Create function to delete a task. Pass taskId string over interface.
deleteTask(taskId: string) {
  // Create interface object to pass over the application.
  let dialogData = {} as DialogData;
  dialogData.header = 'Delete Record Dialog';
  dialogData.body = 'Are you sure you want to delete this record?';

  // Open dialog. Pass over dialogData.
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: dialogData,
    // Set dialog to not close until user answers option.
    disableClose: true

  })

  // If dialog closes, subscribe to event.
  dialogRef.afterClosed().subscribe({
    next: (result) => {
      // If response is confirm, call delete task service.
      if (result === 'confirm') {
        this.taskService.deleteTask(this.empId, taskId).subscribe({
          next: (res) => {
            this.employee = res.data
          },
          error: (e) => {
            console.log(e);
          },
          // After next and error complete, take todo array and done array and assign them to variables.
          complete: () => {
            this.todo = this.employee.todo;
            this.doing = this.employee.doing;
            this.done = this.employee.done;
          }
        })
      }
    }
  })
}

// Create event to handle user dragging and dropping items.
drop(event: CdkDragDrop<any[]>) {
  // Create an event when items are dragged in same container.
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    console.log('Reordered tasks in the same column');
    // If user moves to the same container, update the items.
    this.updateTaskList(this.empId, this.todo, this.doing, this.done);
  } else {
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)

    console.log('Moved tasks to a new column');
    this.updateTaskList(this.empId, this.todo, this.doing, this.done);
  }

  // Handle events when items are dragged into another container.
}

  // Create a function to make a call to API.
  updateTaskList(empId: string, todo: Item[], doing: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, doing, done).subscribe({
      next: (res) => {
        this.employee = res.data;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log(this.employee);
        // Rebind data back.
        this.todo = this.employee.todo;
        this.doing = this.employee.doing;
        this.done = this.employee.done;
      }
    })

  }
}
