import jwt from "jsonwebtoken";
import { generatePassword } from "../../data/generate-password.js";
import { userService } from "../../services/web/user.service.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();
const { SECRET_TOKEN } = process.env;

const service = new userService();

const create = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await service.findExisting(data);
    if (user.length > 0) {
      res.send({
        isValid: false,
        message: "Este usuario ya esta registrado",
      });
    } else {
      const password = generatePassword();
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await service.create(data, passwordHash);
      if (user.rowsAffected > 0) {
        return res.send({
          isValid: true,
          message: "Usuario Creado Exitosamente",
          password,
        });
      }
      return res.send({
        isValid: true,
        message: "Error al crear el usuario",
      });
    }
  } catch (error) {
    next(error);
  }
};

const select = async (req, res, next) => {
  try {
    const users = await service.select();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getRoles = async (req, res, next) => {
  try {
    const roles = await service.getRoles();
    res.send(roles);
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const users = await service.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const Cookie = req.cookies.Auth;
  const decoded = jwt.decode(`${Cookie}`, SECRET_TOKEN);
  try {
    const user = await service.findOne(decoded?.id_user);
    res.send(user[0]);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  let passwordHash = null;
  if (data.password) {
    const pass = await bcrypt.hash(data?.password, 10);
    passwordHash = pass;
  }
  try {
    const result = await service.update(data, passwordHash, id);
    if (result.rowsAffected > 0) {
      return res.send({
        isValid: true,
        message: "Usuario Actualizado Exitosamente",
      });
    }
    return res.send({
      isValid: true,
      message: "Error al actualizar al usuario",
    });
  } catch (error) {
    next(error);
  }
};

const changeStatus = async (req, res, next) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    if (estado == 1) {
      const result = await service.inactiveUser(id);
      if (result.rowsAffected > 0) {
        res.send({
          isValid: true,
          message: "Estado Actualizado Exitosamente",
        });
      }
    } else if (estado == 0) {
      const result = await service.activeUser(id);
      if (result.rowsAffected > 0) {
        res.send({
          isValid: true,
          message: "Estado Actualizado Exitosamente",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export { create, select, getRoles, find, findOne, update, changeStatus };
