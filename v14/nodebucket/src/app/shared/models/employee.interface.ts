/*
============================================
; Title: nodebucket
; File Name: employee.interface.ts
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

//Model for users login that displays name.
export interface Employee {
  empId: string;
  firstName: string;
  lastName: string;
}
