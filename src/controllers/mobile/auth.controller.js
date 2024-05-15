import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { authService } from "../../services/mobile/auth.service.js";
config();

const serviceAuth = new authService();

const { SECRET_TOKEN } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await serviceAuth.login(email);
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
          { id_patient: result[0].id_paciente },
          SECRET_TOKEN,
          { expiresIn: 84000 }
        );
        res.send({
          token,
          auth: true,
          message: `BIENVENIDO DE NUEVO ${result[0].nombre}`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export { login };
