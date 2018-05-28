const debug = require('debug')('boulibar:routes/index');
const express = require('express');
const { name, version } = require('../../package.json');
const copy = require('./copy.json');

const router = express.Router();

router.get('/', (req, res) => {
  const stylesheet = `${process.env.PROD === 'true' ? 'stylesheets' : ''}`;
  const model = {
    copy,
    name: name.toUpperCase(),
    stylesheet,
    version
  };
  debug(model);
  res.render('index', model);
});

module.exports = router;
