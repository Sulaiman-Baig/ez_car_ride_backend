var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser');  

const sequelize = require('./database/database');

// CUSTOM ROUTERS
var indexRouter = require('./routes/index');
var bookingRouter = require('./routes/booking');
var customerRouter = require('./routes/customer');
var carSizeRouter = require('./routes/car-size');
var comissionRouter = require('./routes/comission');
var driverRouter = require('./routes/driver');
var vehicleRouter = require('./routes/vehicle');
var withdrawRouter = require('./routes/withdraw');


var app = express();
app.use(cors());

// view engine setup

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/images'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});


// CUSTOM ROUTES
app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/booking', bookingRouter);
app.use('/car-size', carSizeRouter);
app.use('/comission', comissionRouter);
app.use('/driver', driverRouter);
app.use('/vehicle', vehicleRouter);
app.use('/withdraw', withdrawRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

module.exports = app;
