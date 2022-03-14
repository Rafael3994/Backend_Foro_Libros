var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose');
var router = require('./routes/router');
const i18next = require('i18next');

require('dotenv').config()

i18nextInit();
connect();

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.status(500).json();
});

function listen() {
}


function connect() {
  try {
    mongoose.connection
      .on("error", console.log)
      .on("disconnected", connect)
      .once("open", listen);
    var connection = require('./config/mongoose');
    return connection;
  } catch (e) {
    console.log(e.message);
  }
}

async function i18nextInit () {
  await i18next.init({
    lng: 'es', // if you're using a language detector, do not define the lng option
    debug: false,
    resources: {
      en: {
        translation: {
          'lengChange': 'Lenguage was changed.'
        }
      },
      es: {
        translation: {
          'lengChange': 'Se cambio el idioma.'
        }
      },
      cat: {
        translation: {
          'lengChange': "L'idioma ha canviat."
        }
      }
    }
  }
  );
}

module.exports = app;
