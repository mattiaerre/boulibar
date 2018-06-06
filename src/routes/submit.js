const debug = require('debug')('boulibar:routes/submit');
const express = require('express');
const path = require('path');
const pug = require('pug');
const { name, version } = require('../../package.json');
const sendMail = require('./send-mail');

const router = express.Router();

const textTemplate = data => {
  switch (data.key) {
    case 'contact':
      return `name: ${data.name}, email: ${data.email}, subject: ${
        data.subject
      }, message: ${data.message}`;
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
    to: process.env.EMAIL_TO,
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
