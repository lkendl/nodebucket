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
const BaseResponse = require('../models/base-response');
const fs = require('fs');

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

// function getJsonFile() {
  // Put into raw data.
  // let data = fs.readFileSync('../data/messages.json');
  // Parses into JSON. Pull data.
//   let messageData = JSON.parse(data);
//   return messageData;
// }


// empId is a requestParams placeholder. Access empId value and specify the name under the req.params object.

// Create an asynchronous findEmployeeById API.
router.get('/:empId', async(req, res) => {
  try {
    // First param is the filter, pass the value is the second value.
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      if (err) {
        const mongoResponse = new BaseResponse(501, 'MongoDB Server Error', err);
        console.log(mongoResponse.toObject());
        res.status(501).send(mongoResponse.toObject());

      } else {

        // let msgData = getJsonFile();

        console.log(emp);
        // If employee exists in MongoDB
        if (emp) {
          const findEmployeeByIdResponse = new BaseResponse(200, 'Query successful', emp);
          res.json(findEmployeeByIdResponse.toObject());
          // If employee cannot be found (ex: 1016)
        } else {
          const notFoundEmployeeResponse = new BaseResponse(200, 'Invalid employee ID. Please try again.', null);
          console.log(notFoundEmployeeResponse.toObject());
          res.json(notFoundEmployeeResponse.toObject());
        }

      }
    })
  } catch (e) {
    console.log(e);
    const errorResponse = new BaseResponse(500, 'Internal Server error!', e);
    res.status(500).send(errorResponse.toObject());
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
        const mongoResponse = new BaseResponse(501, 'MongoDB Server Error', err);
        console.log(mongoResponse.toObject());
        res.status(501).send(mongoResponse.toObject());
      } else {
        console.log(emp);
        res.json(emp);
      }
    })

      // Catch error so application won't crash. Return 500 server error inside user interface.
    } catch(e) {
      console.log(e);
      const errorResponse = new BaseResponse(500, 'Internal Server error!', e);
      res.status(500).send(errorResponse.toObject());
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
        const mongoResponse = new BaseResponse(501, 'MongoDB Server Error', err);
        console.log(mongoResponse.toObject());
        res.status(501).send(mongoResponse.toObject());
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
            const mongoResponse = new BaseResponse(501, 'MongoDB Server Error', err);
            console.log(mongoResponse.toObject());
            res.status(501).send(mongoResponse.toObject());
          } else {
            console.log(updatedEmp);
            res.json(updatedEmp);
          }
        })
      }
    })

  } catch(e){
    console.log(e);
    const errorResponse = new BaseResponse(500, 'Internal Server error!', e);
    res.status(500).send(errorResponse.toObject());
  }
})

/**
 * updateTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - Employees
 *     description: API for updating an employee's tasks in MongoDB Atlas.
 *     summary: Updates employee tasks by empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The user's empId.
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - todo
 *               - done
 *             properties:
 *              todo:
 *                description: User todo input
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    text:
 *                      description: Employee's todo text input
 *                      type: string
 *              done:
 *                description: User done input
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    text:
 *                      description: Employee's done text input
 *                      type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// Create an asynchronous updateTasks API.
router.put('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      if (err) {
        const updateTasksMongoDbError = new BaseError('501', 'MongoDB server error', err);
        console.log(updateTasksMongoDbError.toObject());
        res.status(501).send(updateTasksMongoDbError.toObject());
      } else {
        // Record being returned form MongoDB.
        console.log(emp);

        // Update MongoDB arrays.
        emp.set({
          todo: req.body.todo,
          done: req.body.done
        })

        emp.save(function(err, updatedEmp) {
          if (err) {
            const updatedEmpMongoError = new BaseResponse('501', 'MongoDB server error', err);
            console.log(updatedEmpMongoError.toObject());
            res.status(501).send(updatedEmpMongoError.toObject());
          } else {
            const updatedEmpResponse = new BaseResponse('200', 'Query successful', updatedEmp);
            console.log(updatedEmpResponse.toObject());
            res.status(200).send(updatedEmpResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    const updateTasksCatchError = new BaseResponse('500', 'Internal server error', e);
    console.log(updateTasksCatchError.toObject());
    res.status(500).send(updateTasksCatchError.toObject());
  }
})

// UPDATE THIS API DOCUMENTATION
/**
 * deleteTask
 * @openapi
 * /api/employees/{empId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Employees
 *     description: API to delete an employee's task from MongoDB Atlas.
 *     summary: Deletes a task
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The user's empId.
 *         schema:
 *           type: number
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The taskId of task to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
// Create an asynchronous deleteTask API.
router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      if (err) {
        const deleteTaskMongoErrorResponse = new BaseResponse('501', 'MongoDB server error', err);
        // Response object logged to console.
        console.log(deleteTaskMongoErrorResponse.toObject());
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      } else {
        // If no error, console log record returned form MongoDB.
        console.log(emp);

        const taskId = req.params.taskId;

        // Query todo array and look for the document Id to match teh task Id. A matching record will be held in the todoItem. If it fails, todoItem will be null.
        const todoItem = emp.todo.find(item => item._id.toString() === taskId);
        const doneItem = emp.done.find(item => item._id.toString() === taskId);

        if (todoItem) {
          emp.todo.id(todoItem._id).remove();

          emp.save(function(err, updatedTodoItemEmp) {
            if (err) {
              const updatedTodoItemErrResponse = new BaseResponse('501', 'MongoDB Server error', err);
              console.log(updatedTodoItemErrResponse.toObject());
              res.status(501).send(updatedTodoItemErrResponse.toObject());
            } else {
              const updatedTodoItemSuccess = new BaseResponse('200', 'Query successful', updatedTodoItemEmp);
              console.log(updatedTodoItemSuccess.toObject());
              res.status(200).send(updatedTodoItemSuccess.toObject());
            }
          })

        } else if (doneItem) {
          emp.done.id(doneItem._id).remove();

          emp.save(function(err, updatedDoneItemEmp) {
            if (err) {
              const updatedDoneItemErrResponse = new BaseResponse('501', 'MongoDB server error', err);
              console.log(updatedDoneItemErrResponse.toObject());
              res.status(501).send(updatedDoneItemErrResponse.toObject());
            } else {
              const updatedDoneItemSuccessResponse = new BaseResponse('200', 'Query successful', updatedDoneItemEmp);
              console.log(updatedDoneItemSuccessResponse.toObject());
              res.status(200).send(updatedDoneItemSuccessResponse.toObject());
            }
          })

        } else if (doneItem) {
          emp.done.id(doneItem._id).remove();

          emp.save(function(err, updatedEmp) {
            if (err) {
              const updatedEmpMongoError = new BaseResponse('501', 'MongoDB server error', err);
              console.log(updatedEmpMongoError.toObject());
              res.status(501).send(updatedEmpMongoError.toObject());

            } else {
              const updatedEmpResponse = new BaseResponse('200', 'Query successful', updatedEmp);
              console.log(updatedEmpResponse.toObject());
              res.status(200).send(updatedEmpResponse.toObject());
            }
        })

        } else {
          const invalidTaskResponse = new BaseResponse('300', 'Invalid taskId ' + taskId);
          console.log(invalidTaskResponse.toObject());
          res.status(300).send(invalidTaskResponse.toObject());
        }
      }
    })
  } catch (e) {
    const deleteTaskErrorResponse = new BaseResponse('500', 'Internal server error', e);
    console.log(deleteTaskErrorResponse.toObject());
    res.status(500).send(deleteTaskErrorResponse.toObject());
  }
})

module.exports = router;
