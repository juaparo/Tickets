const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index');
const cors = require('cors');
const session = require('express-session');
// Express instance
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Cors for http requests
app.use(cors());

// Auth middleware
app.use(session({ secret: 'pruebapassport', cookie: { maxAge: 60000}, resave: false, saveUninitialized: false}));

app.use('/', routes);



module.exports = app;
