const nodemailer = require("nodemailer");

require("dotenv").config();

exports.sendReferralEmail = async (
  referrerEmail,
  refereeEmail,
  referralCode
) => {
  try {
    // create transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const recipients = [referrerEmail, refereeEmail];

    // prepare mail options
    let mailOptions = {
      from: "Aradhya Singh",
      to: recipients.join(", "),
      subject: "Referral Code Notification",
      text: `Referral Details Received Successfully for the Code - ${referralCode}`,
    };

    // send mail
    let info = await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error(e);
    console.log(e.message);
  }
};
