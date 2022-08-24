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
 *         description: The user's empId.
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

// empId is a requestParams placeholder. Access empId value and specify the name under the req.params object.

// Create an asynchronous findEmployeeById API.
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
 * @openapi
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description: API for returning an employee's array of tasks from MongoDB Atlas.
 *     summary: returns an array of tasks
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The user's empId.
 *         schema:
 *         type: string
 *     responses:
 *       '200':
 *         description: Employee tasks
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// Create an asynchronous findAllTasks API.
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
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     description: API to create task by empId.
 *     summary: Create task by empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The employee's ID
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - text
 *             properties:
 *              text:
 *                description: User task input
 *                type: string
 *     responses:
 *       '200':
 *         description: Task added to empId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// Create an asynchronous createTask API.
router.post('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      // Define simple error handling logic.
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
        // Push newTask onto todo array.
        emp.todo.push(newTask);

        // Save with Mongoose function and callback the updated record.
        emp.save(function(err, updatedEmp) {
          if (err) {
            console.log(err);
            res.status(501).send({
              'err': 'MongoDB server error: ' + err.message
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
