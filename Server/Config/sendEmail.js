import { Resend } from 'resend';
import dotenv from "dotenv"
dotenv.config()

if (!process.env.RESEND_API_KEY) {
    console.log("No API key available");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({ sendTo, subject, html }) {

    try {
        const { data, error } = await resend.emails.send({
            from: 'SwiftDrop <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            console.log(error);
        }

        return data
    }
    catch (e) {
        return console.log( error );
    }
}


