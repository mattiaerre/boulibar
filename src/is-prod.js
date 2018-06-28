const debug = require('debug')('boulibar:is-prod');

const isProd = () => process.env.PROD === 'true';

debug('PROD:', isProd());

module.exports = isProd;
