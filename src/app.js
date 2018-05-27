const cookieParser = require('cookie-parser');
require('dotenv').config();
const express = require('express');
const favicon = require('express-favicon-short-circuit');
const createError = require('http-errors');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const index = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.PROD !== 'true') {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, 'scss'),
      dest: path.join(__dirname, 'scss'),
      debug: true,
      outputStyle: 'compressed',
      indentedSyntax: false,
      sourceMap: true
    })
  );
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'scss')));

app.use('/', index);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
