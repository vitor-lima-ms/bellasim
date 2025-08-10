import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface IEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (options: IEmailOptions) => {
  try {
    const mailOptions = {
      from: `Ambtec - Redefinição de senha <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("E-mail enviado!");

    return info;
  } catch (error) {
    throw new Error("Não foi possível enviar o e-mail de recuperação!");
  }
};
