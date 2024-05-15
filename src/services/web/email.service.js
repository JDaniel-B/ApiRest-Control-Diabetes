import { config } from "dotenv";
import nodemailer from "nodemailer";
config();

const { EMAIL, PASSWORD_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: EMAIL,
    pass: PASSWORD_EMAIL,
  },
});

export class emailService {
  async sendPassword(email, password) {
    const info = await transporter.sendMail({
      from: EMAIL, // sender address
      to: email, // list of receivers
      subject: "Bienvenido al sistema", // Subject line
      text: "Conraseña para acceder al sistema", // plain text body
      html: `<h1>Tu contraseña para acceder al sistema es:</h1>
      <b>${password}</b>`, // html body
    });
    return info;
  }

  async recoveryPassword(email, password) {
    const info = await transporter.sendMail({
      from: EMAIL, // sender address
      to: email, // list of receivers
      subject: "Recuperacion de contraseña", // Subject line
      text: "Conraseña nueva para acceder al sistema", // plain text body
      html: `<h1>Tu nueva contraseña para acceder al sistema es:</h1>
      <b>${password}</b>`, // html body
    });
    return info;
  }
}
