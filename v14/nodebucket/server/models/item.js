/*
============================================
; Title: nodebucket
; File Name: item.js
; Author: Professor Krasso
; Date: 22 August 2022
; Modified By: Laura Kendl
; Description: Contains the Mongoose models for Employee and itemSchema.
===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for item model.
let itemSchema = new Schema({
  // Define the properties for the document we will be adding to MongoDB.
  text: { type: String }
})

// Export schema to allow other files to use itemSchema.
module.exports = itemSchema;
