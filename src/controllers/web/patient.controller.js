import { generatePassword } from "../../data/generate-password.js";
import { patientService } from "../../services/web/patient.service.js";
import bcrypt from "bcrypt";

const service = new patientService();

const create = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await service.findExisting(data);
    if (result.length > 0) {
      return res.send({
        isValid: false,
        message: "Este usuario ya esta registrado",
      });
    } else {
      const password = generatePassword();
      const passwordHash = await bcrypt.hash(password, 10);
      const patiet = await service.create(data, passwordHash);
      if (patiet.rowsAffected > 0) {
        console.log(password);
        return res.send({
          isValid: true,
          message: "Paciente Creado Exitosamente",
          password,
        });
      }
      return res.send({
        isValid: false,
        message: "Error al crear paciente",
      });
    }
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await service.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await service.findOne(id);
    res.send(patient);
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
        message: "Actualizacion Exitosa",
      });
    }
    return res.send({
      isValid: true,
      message: "Error al actualizar",
    });
  } catch (error) {
    next(error);
  }
};

const changeStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (status == 1) {
      const result = await service.inactive(id);
      if (result.rowsAffected > 0) {
        res.send({
          isValid: true,
          message: "Estado Actualizado Exitosamente",
        });
      }
    } else if (status == 0) {
      const result = await service.active(id);
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

export { create, find, findOne, update, changeStatus };
