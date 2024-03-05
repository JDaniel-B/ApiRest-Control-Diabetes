import jwt from "jsonwebtoken";
import { authService } from "../../services/web/auth.service.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

const { SECRET_TOKEN } = process.env;

const service = new authService();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await service.login(email);
    console.log(result);
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

export { login };
