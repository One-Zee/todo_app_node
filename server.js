/**
 * loading dependencies
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require('./src/db/db_connect');

/**
 * loading config values
 */
const { PORT, options } = require('./config');

/**
 * Setting up swagger specification
 */
const specs = swaggerJsDoc(options);

/**
 * Initializing # express app #
 */
const app = express();

/**
 *  Initializing swagger Ui 
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs , { explorer: true }) );

/**
 * loading # Middleware #
*/
const { getToken, verifyToken } = require('./src/middleware/verifyJwt')

/**
 * Initialize middleware
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/**
 * loading  # routes #
 */
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

/**
* Initializing routes
*/
app.use( '/api/auth', authRoutes );
app.use( '/api/category', [ getToken, verifyToken ], categoryRoutes );
app.use( '/api/task', [ getToken, verifyToken ], taskRoutes );


app.listen( PORT , () => {
    console.log(`Listening on Port ${PORT}...`);
})