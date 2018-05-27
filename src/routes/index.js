const express = require('express');
const { name, version } = require('../../package.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { name: name.toUpperCase(), version });
});

module.exports = router;
