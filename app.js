var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./models/clients');
var indexRouter = require('./routes/index');
var clientsRouter = require('./routes/clients');
var mongoose = require('mongoose');
var cors = require('cors')
var app = express();

mongoose.connect("mongodb://localhost/test_api_swamy");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/clients', clientsRouter);
// Add headers
app.use(cors({origin: 'http://localhost:4200'}));
module.exports = app;
