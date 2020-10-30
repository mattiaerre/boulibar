const debug = require('debug')('boulibar:routes/index');
const express = require('express');
const { name, version } = require('../../package.json');
const isProd = require('../is-prod');
const copy = require('./copy.json');
const siteMap = require('./site-map.json');

const router = express.Router();

function handler(req, res, page) {
  const stylesheet = `${isProd() ? 'stylesheets' : ''}`;
  const model = {
    appPath: process.env.APP_PATH,
    copy,
    features: {
      paypal: true
    },
    name,
    page,
    payPal: {
      brandName: `${copy['moving-on-productions']} v${version}`,
      env: isProd() ? 'production' : 'sandbox',
      liveClientId: process.env.PAYPAL_LIVE_CLIENT_ID,
      logoImage: process.env.LOGO_LIGHT_BG,
      sandboxClientId: process.env.PAYPAL_SANDBOX_CLIENT_ID
    },
    stylesheet,
    trackingId: process.env.TRACKING_ID,
    version
  };
  debug(model);
  res.render(`pages/${page.key}`, model);
}

Object.keys(siteMap)
  .map((key) => siteMap[key])
  .forEach((page) => {
    router.get(`/${page.path}`, (req, res) =>
      handler(req, res, { ...page, key: page.path || 'home' })
    );
  });

module.exports = router;
