const transporter = require("../config/email")

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: html
    });
};

module.exports = sendEmail