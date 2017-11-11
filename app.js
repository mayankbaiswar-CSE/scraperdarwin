const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var uploader = require('./routes/uploader');

var mkdir = require('./utils/mkdir');

var app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://mayankbaiswar:03qwerty@ds257485.mlab.com:57485/nodetest_scraper');
const db = mongoose.connection;
mongoose.connection.on('connected', function () {
  console.log('connected to databse.');
});
db.on('error', console.error.bind(console, 'connection error.'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use('/upload/', uploader);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/')));
app.use('/', index);
app.use('/test', users);

// make directory to download image to
mkdir();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/downloads', express.static(path.join(__dirname, '/downloads')));

module.exports = app;
