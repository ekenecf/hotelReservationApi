import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  //First create a transporter which is a service such as gmail
  const transporter = nodemailer.createTransport({
    // service: "Gmail",
    //to use gmail service you need to use the "less secure app" option
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //define email options
  let mailOptions = {
    //specify where the email is coming from
    from: "Ekene Nwachukwu <hello@ekene.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //send email with nodeMailer
  await transporter.sendMail(mailOptions);
};
export default sendEmail;
