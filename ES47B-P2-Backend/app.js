const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// App init
const app = express();
const PORT = process.env.PORT || 1414;
global.IS_PRODUCTION = process.env.PRODUCTION === "true";

// DB connection
const connect = require('./src/database/connection');
connect();

// App setup
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.json());
app.use(require('cors')());

// Importing router.js
const router = require('./src/router/router');
app.use(router);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));