const nodemailer = require('nodemailer');
// https://medium.com/@manojsinghnegi/sending-an-email-using-nodemailer-gmail-7cfa0712a799

module.exports = (mailOptions, callback) => {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email', // INFO: http://www.serversmtp.com/en/smtp-gmail-configuration
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
      }
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return callback(error);
      }
      return callback(
        null,
        Object.assign({}, info, {
          previewUrl: nodemailer.getTestMessageUrl(info)
        })
      );
    });
  });
};
