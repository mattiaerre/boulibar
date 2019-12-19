const nodemailer = require('nodemailer');
const isProd = require('../is-prod');
// https://medium.com/@manojsinghnegi/sending-an-email-using-nodemailer-gmail-7cfa0712a799

const { MAILGUN_PASS, MAILGUN_USER } = process.env;

module.exports = async (mailOptions, callback) => {
  try {
    let transport;
    if (!isProd()) {
      const account = await nodemailer.createTestAccount();

      transport = {
        host: 'smtp.ethereal.email', // INFO: http://www.serversmtp.com/en/smtp-gmail-configuration
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
        }
      };
    } else {
      transport = {
        host: 'smtp.mailgun.org',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: MAILGUN_USER,
          pass: MAILGUN_PASS
        }
      };
    }
    const transporter = nodemailer.createTransport(transport);

    const info = await transporter.sendMail(mailOptions);

    return callback(
      null,
      // eslint-disable-next-line prefer-object-spread
      Object.assign({}, info, {
        previewUrl: nodemailer.getTestMessageUrl(info)
      })
    );
  } catch (error) {
    return callback(error);
  }
};
