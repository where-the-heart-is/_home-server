const express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  cors = require('cors');

const app = express();

const users = require('./api/users');
const property = require('./api/property');
const auth = require('./auth/index');

const authMiddleware = require('./auth/middleware')

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', users);
app.use('/api/v1/property', property);

app.use('/auth', auth)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // render the error page
  res.status(err.status || 500);
  res.json({
		message: err.message,
		error: req.app.get('env') === 'development' ? err : {}
		});
});
module.exports = app;
