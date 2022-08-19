/*
============================================
; Title: nodebucket
; File Name: index.js
; Author: Professor Krasso
; Date: 15 August 2022
; Modified By: Laura Kendl
; Description: "nodebucket is task management software designed to simplify the way you
; create, track, edit, and delete time sensitive material. This is a full-stack
; MEAN (MongoDB, Express, Angular, and Node.js) application, utilizing the concepts that
; were taught in previous courses. MongoDB will be used for data persistence. Node.js
; will be used for manipulating and returning saved records, SoapUI for unit testing,
; and Angular for user interactions" (Krasso, 2022).
===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const EmployeeAPI = require('./routes/employee-api');
const app = express();

/*
  ----- OBJECT LITERALS -----
*/
const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'WEB 420 RESTful APIs',
          version: '1.0.0',
      },
  },
  apis: ['./server/routes/*.js'], // Files containing annotations for the OpenAPI Specification
};

// Call swaggerJSdoc library using options object literal.
const openapiSpecification = swaggerJsdoc(options);

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

// Wire openapiSpecification variable to app variable.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
// Adds a prefix to all of the routes inside the employeeAPI file.
app.use('/api/employees', EmployeeAPI);

// default server port value.
const PORT = 3000 || process.env.PORT;

// Database connection string.
const CONN = 'mongodb+srv://nodebucket_user:s3cret@buwebdev-cluster-1.p8egd.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection.
 */
mongoose.connect(CONN).then(() => {
  console.log('Connection to the database was successful');
}).catch(err => {
  console.log('MongoDB Error: ' + err.message);
});

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
