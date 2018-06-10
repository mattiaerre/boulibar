const debug = require('debug')('boulibar:routes/submit');
const express = require('express');
const path = require('path');
const pug = require('pug');
const { name, version } = require('../../package.json');
const sendMail = require('./send-mail');

const router = express.Router();

const to = data => {
  switch (data.key) {
    case 'contact':
      return process.env.EMAIL_INFO;
    case 'payment':
      return process.env.EMAIL_FINANCE;
    case 'quote':
      return process.env.EMAIL_OPERATIONS;
    default:
      return process.env.EMAIL_ADMIN;
  }
};

const textTemplate = data => {
  switch (data.key) {
    case 'contact':
      return `name: ${data.name}, email: ${data.email}, subject: ${
        data.subject
      }, message: ${data.message}`;
    case 'payment':
      return 'TODO';
    case 'quote':
      return 'TODO';
    default:
      return 'Doh!';
  }
};

router.post('/', (req, res) => {
  const { data } = req.body;
  const mailOptions = {
    from: data.email,
    to: to(data),
    subject: data.subject,
    text: textTemplate(data),
    html: pug.renderFile(path.join(__dirname, '../views/email.pug'), data)
  };
  sendMail(mailOptions, (error, info) => {
    const model = { data, message: `${name} v${version}` };
    if (error) {
      debug(error);
      return res.json(Object.assign({}, model, { error }));
    }
    return res.json(Object.assign({}, model, { info }));
  });
});

module.exports = router;
