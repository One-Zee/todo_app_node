/**
 * INITIALIZING # ROUTER #
 */
 const router = require('express').Router();

 /**
  * loading # Middleware #
  */
const { isTaskfromCategory, } = require('../middleware/helper')
const { taskMoveValidation, taskValidation, paramsIdValidation } = require('../middleware/validation')
 /**
  * loading # Controllers #
  */
 const { createTask, editTask, delTask , moveToCategory } = require('../controllers/tasksController');

 /**
  * setting # routes #
  */

    // # GET # requests
        //router.get('/') //get
    
    // # Post # requests
        router.post('/:id', paramsIdValidation, taskValidation, createTask );

    // # Del # requests
        router.delete('/:id', delTask );

    // # Put # requests
        router.put('/:id', editTask );

        router.put('/move/:id',taskMoveValidation, isTaskfromCategory, moveToCategory)
 
 /**
  * exporting # ROUTER #
  */
 module.exports = router;

    /**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: auto-generated id of the Task
 *         title:
 *           type: string
 *           description: Task title.
 *         completed:
 *           type: boolean
 *           description: is the task finshed
 *         date:
 *           type: string
 *           description: date of task
 *         tasks:
 *           type: array                  
 *       example:
 *         title: Category_name
 */
 
 
/**
 * @swagger
 * tags:
 *   name: Task
 *   description: The task API
 */

/**
 * @swagger
 * /api/task:
 *   post:
 *     tags: [Task] 
 *     summary: Create new Task.
 *     requestBody:
 *       description: New task
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Task'   
 *     responses:
 *       201:
 *         description: category created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *       401:
 *         description: Unauthorized! Access Token was expired!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: false
 *                 msg: Unauthorized! Access Token was expired! 
 *       403:
 *         description: Forbidden!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: false
 *                 msg: No token provided.         
 */


/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     tags: [Task] 
 *     summary: delete task.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category id  
 *     responses:
 *       200:
 *         description: task deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *       400:
 *         description: bad request client side syntax.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *       404:
 *         description: task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *       401:
 *         description: Unauthorized! Access Token was expired!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: false
 *                 msg: Unauthorized! Access Token was expired!
 *       403:
 *         description: Forbidden!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: false
 *                 msg: No token provided.   
 */


/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     tags: [Task] 
 *     summary: edit Task.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task id
 *     requestBody:
 *       description: edit task.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Task'     
 *                     
 *     responses:
 *       200:
 *         description: Task edited.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *       400:
 *         description: bad request client side syntax.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *       401:
 *         description: Unauthorized! Access Token was expired!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: false
 *                 msg: Unauthorized! Access Token was expired!
 *       403:
 *         description: Forbidden!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: false
 *                 msg: No token provided. 
 */

/**
 * @swagger
 * /api/task/move/{id}:
 *   put:
 *     tags: [Task] 
 *     summary: move Task.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task id
 *     requestBody:
 *       description: edit task.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Task'     
 *                     
 *     responses:
 *       200:
 *         description: Task moved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *       400:
 *         description: bad request client side syntax.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *                 msg: bad request 
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *       401:
 *         description: Unauthorized! Access Token was expired!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: false
 *                 msg: Unauthorized! Access Token was expired!
 *       403:
 *         description: Forbidden!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: false
 *                 msg: No token provided. 
 */