/*
============================================
; Title: nodebucket
; File Name: employee-api.js
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

// Require JavaScript libraries.
const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

/**
 * findEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *   get:
 *     tags:
 *       - Employees
 *     description: API for returning a single employee document from MongoDB Atlas.
 *     summary: returns an employee document
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The empId requested by the user.
 *         schema:
 *         type: string
 *     responses:
 *       '200':
 *         description: Employee document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// empId is a requestParams placeholder. To access empId value, you must specify the name under the req.params object.

// Async fires and whatever finishes first, finishes first. The callback is when you handle the response from the asynchronous call. Use await to make a call to it. This is the observable so no await needed. If you want to CALL it, then use await.
router.get('/:empId', async(req, res) => {
  try {
    // First param is the filter, pass the value is the second value.
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      // Check if error.
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB Server Error: ' + err.message
        })
      } else {
        console.log(emp);
        res.json(emp);
      }
    })
  } catch (e) {
    console.log(e);
    response.status(500).send({
      'err': 'Internal server error!'
    })
  }
})

/**
 * findAllTasks
 */
// Create an asynchronous API.
router.get('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, emp) {
      if(err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB server error: ' + err.message //
        })
      } else {
        console.log(emp);
        res.json(emp);
      }
    })

      // Catch error so application won't crash. Return 500 server error inside user interface.
    } catch(e) {
      console.log(e);
      res.status(500).send({
        'err': 'Internal server error: ' + e.message
    })
  }
})

/**
 * createTask
 */
router.post('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      // Simple error handling logic.
      if(err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB server error: ' + err.message
        })
      } else {
        console.log(emp);

        const newTask = {
          text: req.body.text
        }
        // Push newTask onto employee array.
        emp.todo.push(newTask);

        // Save with Mongoose function and callback for the updated record.
        emp.save(function(err, updatedEmp) {
          if (err) {
            console.log(err);
            res.status(501).send({
              'err': 'MongoDB server error: ' + err.essage
            })
          } else {
            console.log(updatedEmp);
            res.json(updatedEmp);
          }
        })
      }
    })

  } catch(e){
    console.log(e);
    res.status(500).send({
      'err': 'Internal server error: ' + e.message
    })
  }
})


module.exports = router;
