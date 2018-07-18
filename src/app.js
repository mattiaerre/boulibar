const cookieParser = require('cookie-parser');
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const favicon = require('serve-favicon');
const isProd = require('./is-prod');
const index = require('./routes/index');
const submit = require('./routes/submit');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (!isProd()) {
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

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'scss')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/', index);
app.use('/submit', submit);

app.use((req, res) => {
  [
    { from: '/site/contact/information', to: '/contact' },
    { from: '/site/transcription/about', to: '/about' },
    { from: '/site/transcription/formats', to: '/format' },
    { from: '/site/transcription/information', to: '/about' },
    { from: '/site/transcription/payment', to: '/payment' },
    { from: '/site/transcription/rates', to: '/quote' }
  ].forEach(({ from, to }) => {
    if (from === req.path) {
      res.redirect(to);
    }
  });
  res.redirect('/');
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
