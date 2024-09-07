require("dotenv").config();
const nodemailer = require('nodemailer');

// Create the transporter object
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendMail = async (email, subject, content) => {
    try {
        var mailOptions = {
            from: process.env.SMTP_MAIL, // Sender's email
            to: email,                   // Recipient's email
            subject: subject,            // Email subject
            html: content                // HTML content of the email
        };

        // Use transporter to send the mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending mail:", error);
                return;
            }
            console.log("Mail sent successfully:", info.messageId);
        });
    } catch (error) {
        console.log("Error in sendMail function:", error.message);
    }
};

module.exports = {
    sendMail
};
