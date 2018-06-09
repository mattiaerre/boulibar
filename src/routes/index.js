const debug = require('debug')('boulibar:routes/index');
const express = require('express');
const { name, version } = require('../../package.json');
const copy = require('./copy.json');
const siteMap = require('./site-map.json');

const router = express.Router();

function handler(req, res, page) {
  const stylesheet = `${process.env.PROD === 'true' ? 'stylesheets' : ''}`;
  const model = {
    copy,
    name,
    page,
    stylesheet,
    trackingId: process.env.TRACKING_ID,
    version
  };
  debug(model);
  res.render('index', model);
}

Object.keys(siteMap)
  .map(key => siteMap[key])
  .filter(page => page.v1 === true)
  .forEach(page => {
    router.get(`/${page.path}`, (req, res) =>
      handler(req, res, Object.assign({}, page, { key: page.path || 'home' }))
    );
  });

module.exports = router;
