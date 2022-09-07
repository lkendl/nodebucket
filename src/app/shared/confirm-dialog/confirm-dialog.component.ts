/*
============================================
; Title: nodebucket
; File Name: confirm-dialog.component.ts
; Author: Professor Krasso
; Date: 31 August 2022
; Modified By: Laura Kendl
; Description: "nodebucket is task management software designed to simplify the way you
; create, track, edit, and delete time sensitive material. This is a full-stack
; MEAN (MongoDB, Express, Angular, and Node.js) application, utilizing the concepts that
; were taught in previous courses. MongoDB will be used for data persistence. Node.js
; will be used for manipulating and returning saved records, SoapUI for unit testing,
; and Angular for user interactions" (Krasso, 2022).
===========================================
*/

import { Component, Inject, OnInit } from '@angular/core';
import { DialogData } from '../models/dialog-data.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  dialogData: DialogData;

  // Bind DialogData object (from home.component.ts) to dialogData variable.
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData = data;
  }

  ngOnInit(): void {
  }

}
