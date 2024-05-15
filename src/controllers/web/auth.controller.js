import jwt from "jsonwebtoken";
import { authService } from "../../services/web/auth.service.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { emailService } from "../../services/web/email.service.js";
import { userService } from "../../services/web/user.service.js";
import { generatePassword } from "../../data/generate-password.js";
config();

const { SECRET_TOKEN } = process.env;

const service = new authService();
const serviceEmail = new emailService();
const serviceUser = new userService();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await service.login(email);
    if (result.length == 0) {
      return res.send({
        auth: false,
        message: "Usuario o Contraseña Incorrectos",
      });
    } else {
      const validation = await bcrypt.compare(password, result[0].password);
      if (!validation) {
        return res.send({
          auth: false,
          message: "Usuario o Contraseña Incorrectos",
        });
      } else {
        const token = jwt.sign(
          { id_user: result[0].id_usuario },
          SECRET_TOKEN,
          { expiresIn: 84000 }
        );
        res.cookie("Auth", token, {
          maxAge: 3600000, // Duración de la cookie en milisegundos (1 hora en este caso)
          httpOnly: true, // Hace que la cookie sea accesible solo desde el servidor
          secure: true,
        });
        res.send({
          auth: true,
          message: `BIENVENIDO DE NUEVO ${result[0].nombre}`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const recoveryPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await service.login(email);
    if (result.length == 0) {
      return res.send({
        auth: false,
        message: "Usuario Incorrecto",
      });
    } else {
      const password = generatePassword();
      const passwordHash = await bcrypt.hash(password, 10);
      const sendEmail = await serviceEmail.recoveryPassword(
        result[0].email,
        password
      );
      const recovery = await serviceUser.recoveryPassword(
        result[0].id_usuario,
        passwordHash
      );
      return res.send({
        auth: true,
        message: "Correo Electronico enviado exitosamente",
      });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.cookie("Auth", {
    expires: Date.now(),
    maxAge: Date.now(),
    httpOnly: true,
    secure: true,
  });
  res.send({ message: "sesion cerrada" });
};

export { login, recoveryPassword, logout };
