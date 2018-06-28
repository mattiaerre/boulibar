const nodemailer = require('nodemailer');
const isProd = require('../is-prod');
// https://medium.com/@manojsinghnegi/sending-an-email-using-nodemailer-gmail-7cfa0712a799

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
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      };
    }
    const transporter = nodemailer.createTransport(transport);

    const info = await transporter.sendMail(mailOptions);

    return callback(
      null,
      Object.assign({}, info, {
        previewUrl: nodemailer.getTestMessageUrl(info)
      })
    );
  } catch (error) {
    callback(error);
  }
};
