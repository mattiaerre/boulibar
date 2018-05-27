const debug = require('debug')('boulibar:routes/index');
const express = require('express');
const { name, version } = require('../../package.json');

const router = express.Router();

router.get('/', (req, res) => {
  const stylesheet = `${process.env.PROD === true ? 'stylesheets' : ''}`;
  const model = { name: name.toUpperCase(), stylesheet, version };
  debug(model);
  res.render('index', model);
});

module.exports = router;
