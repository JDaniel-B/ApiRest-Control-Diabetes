import { recordService } from "../../services/web/record.service.js";

const service = new recordService();

const find = async (req, res, next) => {
  try {
    const result = await service.find();
    return res.send(result);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.findOne(id);
    return res.send(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await service.create(data);
    if (result.rowsAffected > 0) {
      return res.send({
        isValid: true,
        message: "Expediente Creado Exitosamente",
      });
    }
    return res.send({
      isValid: true,
      message: "Error al crear el expediente",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const result = await service.update(data, id);
    if (result.rowsAffected > 0) {
      return res.send({
        isValid: true,
        message: "Expediente Actualizado Exitosamente",
      });
    }
    return res.send({
      isValid: true,
      message: "Error al actualizar al expediente",
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

export { find, findOne, create, update, changeStatus };
