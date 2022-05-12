const nodemailer = require("nodemailer")

// create reusable transporter object using the default SMTP transport
const sendMail = async (email, authToken) => {

    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER, // generated ethereal user
                pass: process.env.PASS, // generated ethereal password
            },
        })

        // send mail with defined transport object
        let url = `http://localhost:3000/verifyemail/${authToken}`

        let info = await transporter.sendMail({
            from: '"Waste Aid" <emailverify.wasteaid@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Waste-Aid Email Verification", // Subject line
            // text: "Hello world?", // plain text body
            html: `<div style="font-family: \'Nirmala UI\'; width: 100%; color: #444; padding: 1em;"><div style="background: #fff; border-radius: 10px; margin: 4em auto; width: fit-content;"><img  style="width: 150px; display: block; margin: auto;" src="https://res.cloudinary.com/kevalcloud/image/upload/v1649850937/waste-aid-logo-1_s2fzsh.png" alt="waste aid logo" /><p style="text-align: center;">We are glad you chose to join Waste-Aid :D</p><p style="text-align: center;">Click below Button to verify your email! </p><a style="display: block; margin: auto; width: fit-content; text-decoration: none; background-color: #a0e4b0; padding: 4px 10px; color: #fff; border-radius: 4px;" href="${url}">Verify Email</a></div><p style="text-align: center;"> © 2022 Waste-Aid. All rights Reserved.</p></div>`, // html body
        })
        return true

    } catch (error) {
        console.log(error)
    }
}

module.exports = sendMail