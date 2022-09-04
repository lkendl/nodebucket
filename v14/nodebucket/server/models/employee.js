/*
============================================
; Title: nodebucket
; File Name: employee.js
; Author: Professor Krasso
; Date: 15 August 2022
; Modified By: Laura Kendl
; Description: Contains the Mongoose models for Employee and itemSchema.
===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./item');

// Create schema for this model.
let employeeSchema = new Schema({
  // Define the properties for the document we will be adding to MongoDB.
  empId: { type: String, unique: true, required: true },
  firstName: { type: String },
  lastName: { type: String },
  todo: [itemSchema],
  doing: [itemSchema],
  done: [itemSchema]
  // Define MongoDB collection to connect to.
}, { collection: 'employees'}); // Note: If left undefined, MongoDB will automatically create a new collection with a plural. (i.e., model "Roles" Mongoose will create a MongoDB collection named "Roleses").

// Transition schema into a Mongoose model.
module.exports = mongoose.model('Employee', employeeSchema);
