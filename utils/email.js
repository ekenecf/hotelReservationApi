import nodemailer from "nodemailer"

const sendEmail = options => {
    //First create a transporter which is a service such as gmail
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user:process.env.EMAIL,
            password:process.env.EMAIL_PASSWORD
        }
    })
    //to use gmail service you need to use the "less secure app" option

    //define email options

    //send email with nodeMailer
}