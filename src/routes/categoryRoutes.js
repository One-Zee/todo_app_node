/**
 * INITIALIZING # ROUTER #
 */
 const router = require('express').Router();

 /**
  * loading # Middleware #
  */
const { CategoryValidation ,paramsIdValidation } = require('../middleware/validation')
 /**
  * loading # Controllers #
  */
 const { createCategory, getAllCategories, delCategory, editCategory } = require('../controllers/categoryController');

 /**
  * setting # routes #
  */

    // # GET # requests
        router.get('/', getAllCategories ) //get all categories from user
    
    // # Post # requests
        router.post('/', CategoryValidation, createCategory );

    // # Del # requests
        router.delete('/:id', paramsIdValidation, delCategory );

    // # Put # requests
        router.put('/:id', CategoryValidation, editCategory );
 
 /**
  * exporting # ROUTER #
  */
 module.exports = router;

   /**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: auto-generated id of the Category
 *         title:
 *           type: string
 *           description: Category title.
 *         authorId:
 *           type: string
 *           description: auto-generated id of the author
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'                      
 *       example:
 *         title: Category_name
 *     Cat_res1:
 *       type: object
 *       required:
 *         - auth
 *         - data
 *       properties:
 *         auth:
 *           type: boolean
 *           description: Is the user authorized.
 *         data:
 *           type: array
 *           nullable: true
 *           items:
 *             $ref: '#/components/schemas/Category'      
 *           description: requested data.   
 *       example:
 *         auth: true
 *         data: [{ id:623afd325184db65d9c4afb6 , title: gym , authorId: 623ac5142332c46057abf4b3 ,tasks: []}]
 */
 
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The category API
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     tags: [Category] 
 *     summary: get all user categories and tasks.
 *     Authorization: Bearer <token>
 *     responses:
 *       200:
 *         description: data requested.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Cat_res1'
 *               example:
 *                 auth: true
 *                 data: [] 
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
 * /api/category:
 *   post:
 *     tags: [Category] 
 *     summary: create category.
 *     requestBody:
 *       description: new category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Category'   
 *     responses:
 *       201:
 *         description: category created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Cat_res1'
 *               example:
 *                 auth: true
 *                 data: [] 
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
 * /api/category/{id}:
 *   delete:
 *     tags: [Category] 
 *     summary: delete category.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category id  
 *                     
 *     responses:
 *       200:
 *         description: category deleted.
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
 *         description: category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/jwt_res'
 *               example:
 *                 auth: true
 *                 msg: not found 
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
 * /api/category/{id}:
 *   put:
 *     tags: [Category] 
 *     summary: edit category.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category id
 *     requestBody:
 *       description: edit category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Category'     
 *                     
 *     responses:
 *       200:
 *         description: category edited.
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
 *         description: category not found.
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