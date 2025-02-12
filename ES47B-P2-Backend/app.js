const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
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
app.use(require('cors')({ origin: "http://localhost:5173", credentials: true }));

// Compression
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// Importing router.js
const router = require('./src/router/router');
app.use(router);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));