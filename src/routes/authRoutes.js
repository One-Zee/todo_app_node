/**
 * INITIALIZING # ROUTER #
 */
 const router = require('express').Router();

 /**
  * loading # Middleware #
  */
const { duplicateUser } = require('../middleware/helper')
 /**
  * loading # Controllers #
  */
 const { signIn , signUp } = require('../controllers/authController');
 
 /**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: auto-generated id of the User
 *         username:
 *           type: string
 *           description: username of the User
 *         password:
 *           type: string
 *           description: User password    
 *       example:
 *         username: harun
 *         password: password1 
 *     Signin_response:
 *       type: object
 *       required:
 *         - auth
 *         - accessToken
 *       properties:
 *         auth:
 *           type: boolean
 *           description: Is the user authorized.
 *         accessToken:
 *           type: string
 *           nullable: true
 *           description: Jwt.
 *         msg:
 *           type: string
 *           description: Simple dev messages    
 *       example:
 *         auth: true
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2FjNTs0MjMzMmM0NjA1N2FiZjRiMyIsImlhdCI6MTY0ODEwNTA0NSwiZahwIjoxNjQ4MTkxNDQ1fQ.zTJym3D7sChrur85HqsrUyfuIhSar2O8GFQdCc6wh9Q
 *         msg: Logged in!
 *     Signup_response:
 *       type: object
 *       required:
 *         - signUp
 *         - data
 *       properties:
 *         signUp:
 *           type: boolean
 *           description: Is the user Registered.
 *         data:
 *           type: object
 *           nullable: true
 *           description: User data.
 *         msg:
 *           type: string
 *           description: Simple dev messages    
 *       example:
 *         signUp: false
 *         data: null
 *         msg: Username already exists
 */


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The User auth API
 */



/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags: [Auth] 
 *     summary: User Login.
 *     requestBody:
 *       description: Json
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'   
 *     responses:
 *       200:
 *         description: User succesfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Signin_response'
 *               example:
 *                 auth: true,
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2FjNTs0MjMzMmM0NjA1N2FiZjRiMyIsImlhdCI6MTY0ODEwNTA0NSwiZahwIjoxNjQ4MTkxNDQ1fQ.zTJym3D7sChrur85HqsrUyfuIhSar2O8GFQdCc6wh9Q
 *                 msg: Logged in! 
 *       400:
 *         description: Bad request wrong password or username .
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Signin_response'
 *               example:
 *                 auth: false,
 *                 accessToken: null
 *                 msg: Invalid Password
 *       500:
 *         description: In case of internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example:
 *                 internal server error 
 *          
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [Auth] 
 *     summary: User Register.
 *     requestBody:
 *       description: Json
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'   
 *     responses:
 *       200:
 *         description: Username is already taken.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Signup_response'
 *               example:
 *                 SignUp: false,
 *                 msg: Username already exists
 *                 data: null 
 *       201:
 *         description: User succesfully registered! .
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Signup_response'
 *               example:
 *                 SignUp: true,
 *                 msg: Sign up successfull.
 *                 data: { 
 *                   id: 623c4dcb85d5a8172b9b16fc ,
 *                   username: harun } 
 *       500:
 *         description: In case of internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example:
 *                 internal server error 
 *          
 */


/**
 * setting # routes #
 */
  /**
   *  # Post # requests
   */
    router.post('/signin', signIn );


    router.post('/signup', duplicateUser , signUp );

      /**
       * exporting # ROUTER #
       */
      module.exports = router;