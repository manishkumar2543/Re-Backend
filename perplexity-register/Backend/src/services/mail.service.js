import dotenv from "dotenv"

dotenv.config()

import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
})

transport.verify().
then(() => {
    console.log("transport ready to send emails");
}).catch((error) => {
    console.log("Error transport verifed", error);
});

export async function sendMail({to, subject, html,text=''}) {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }
    const details = await transport.sendMail(mailOptions);
    console.log('mail sent', details);

    
}