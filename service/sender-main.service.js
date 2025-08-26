import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export const sendLoginAlert = async (to, name) => {
  try {
    await transporter.sendMail({
      from: `"MyApp Alert" <${process.env.SMTP_USER}>`,
      to,
      subject: "Login Alert - MyApp",
      text: `Halo ${name},\n\nAkun Anda baru saja login.`,
      html: `<p>Halo <b>${name}</b>,</p>
             <p>Akun Anda baru saja login pada aplikasi <b>MyApp</b>.</p>
             <p>Jika ini bukan Anda, segera amankan akun Anda.</p>`,
    });

    console.log("✅ Email alert terkirim ke:", to);
  } catch (err) {
    console.error("❌ Gagal kirim email:", err);
  }
};