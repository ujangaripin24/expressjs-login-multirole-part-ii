import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'node:path';
import pug from 'pug'
dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export const sendLoginAlert = async (to, name, email) => {
    try {
        const templatePath = path.resolve("views/email/loginAlert.pug")
        const html = pug.renderFile(templatePath, {
            name,
            email,
            time: new Date().toLocaleString("id-ID")
        });

        await transporter.sendMail({
            from: `"MyApp Alert" <${process.env.SMTP_USER}>`,
            to,
            subject: "Login Alert - MyApp",
            text: `Halo ${name},\n\nAkun Anda baru saja login.`,
            html,
        });

        console.log("✅ Email alert terkirim ke:", to);
    } catch (err) {
        console.error("❌ Gagal kirim email:", err);
    }
};