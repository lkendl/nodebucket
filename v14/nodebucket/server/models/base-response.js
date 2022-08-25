/*
============================================
; Title: nodebucket
; File Name: base-response.js
; Author: Professor Krasso
; Date: 24 August 2022
; Modified By: Laura Kendl
; Description: Contains the Mongoose models for Employee and itemSchema.
===========================================
*/

// Pass httpCode, a message and data within the class.
class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // Create a single object that returns ...
  toObject () {
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = BaseResponse;
