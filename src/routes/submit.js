const debug = require('debug')('boulibar:routes/submit');
const express = require('express');
const moment = require('moment-timezone');
const path = require('path');
const pug = require('pug');
const { name, version } = require('../../package.json');
const copy = require('./copy.json');
const emails = require('./emails.json');
const sendMail = require('./send-mail');

const router = express.Router();

/*
const to = data => {
  switch (data.key) {
    case 'contact':
      return emails.info;
    case 'payment':
      return emails.finance;
    case 'order':
    case 'quote':
      return emails.operations;
    default:
      return emails.admin;
  }
};
*/

const textTemplate = data =>
  Object.keys(data)
    .map(key => `${key}: ${data[key]}`)
    .join('\n');

router.post('/', (req, res) => {
  const { data } = req.body;
  data['date-time'] = moment()
    .tz('America/New_York')
    .format();
  const mailOptions = {
    from: emails.info,
    to: emails.info,
    subject: `${copy['moving-on-productions']} v${version} - ${copy[data.key]}`,
    text: textTemplate(data),
    html: pug.renderFile(path.join(__dirname, '../views/email.pug'), data)
  };
  sendMail(mailOptions, (error, info) => {
    const model = { data, message: `${name} v${version}` };
    if (error) {
      debug(error);
      return res.json({ ...model, error });
    }
    return res.json({ ...model, info });
  });
});

module.exports = router;
