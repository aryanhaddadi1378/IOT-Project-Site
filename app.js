var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require("jsonwebtoken");
var indexRouter = require('./routes/index');
var attempt = require('./routes/attempt');
var mongoose = require("mongoose");

var app = express();

mongoose.connect("mongodb://ama:amaama23@ds052629.mlab.com:52629/ama",{useNewUrlParser: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use(function(req,res,next){
  if (req.cookies && req.cookies.Authentication && req.cookies.Authentication.split(' ')[0] == 'JAWMTA'){
    jwt.verify(req.cookies.Authentication.split(' ')[1],"amaamaamarullllesssss",function(err,data){
      if (err) {
        req.loginned = null;}
      else {
        req.loginned = data;
      }
      next();
    })
  }
  else {
    req.loginned = null;
    next();
  }
});


app.use('/', indexRouter);
app.use('/attempt', attempt);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
