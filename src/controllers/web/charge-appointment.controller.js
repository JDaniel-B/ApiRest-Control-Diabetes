import { chargeAppointmentService } from "../../services/web/charge-appointment.service.js";

const service = new chargeAppointmentService();

const find = async (req, res, next) => {
  try {
    const result = await service.find();
    return res.send(result);
  } catch (error) {
    next(error);
  }
};

const findFuture = async (req, res, next) => {
  try {
    const header = await service.headerFuture();
    const detail = await service.detailFuture();
    return res.send({ header, detail });
  } catch (error) {
    next(error);
  }
};

const findByUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.findByUser(id);
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
        message: "Cita Creada Exitosamente",
      });
    }
    return res.send({
      isValid: true,
      message: "Error al crear la cita",
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
        message: "Cita Actualizada Exitosamente",
      });
    }
    return res.send({
      isValid: true,
      message: "Error al actualizar la cita",
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

export { find, findFuture, findByUser, findOne, create, update, changeStatus };
