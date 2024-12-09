require('dotenv').config()

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pelumisemailservice@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

export function sendverificationmail(res, req){
    let link = `https://${process.env.AUTH_LINK}/verify-email?token=${token}&email=${email}`
    const mailOptions = {
        from: "pelumisemailservice@gmail.com",
        to: email,
        subject: "Verify Your Email",
        html: `
                <p>Click the link below to verify your email:</p>
                <a href="${link}" target="_blank">Verify Email</a>
                <p>If you did not request this, please ignore this email.</p>
            `
      };
    transporter.sendMail( mailOptions, (error, info) => {
      if(error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending verification email' });
      }else{
        res.status(200).json({ message: 'Verification email sent!' });
      }
    })
}