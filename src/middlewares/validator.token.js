import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const { SECRET_TOKEN } = process.env;

export const validateToken = (req, res, next) => {
  const token = req.cookies.Auth;
  try {
    jwt.verify(token, SECRET_TOKEN);
    next();
  } catch (error) {
    res.send({
      message: "Token Invalido",
      error: true,
      user: null,
    });
  }
};

export const validateTokenMobile = (req, res, next) => {
  const token = req.header("token");
  try {
    jwt.verify(token, SECRET_TOKEN);
    next();
  } catch (error) {
    res.send({
      message: "Token Invalido",
      error: true,
      user: null,
    });
  }
};
