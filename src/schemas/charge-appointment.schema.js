import Joi from "joi";

const createChargeAppointmentSchema = Joi.object({
  idRecord: Joi.number().required(),
  date: Joi.date().min("now").required(),
});

const updateChargeAppointmentSchema = Joi.object({
  idRecord: Joi.number().allow(null),
  date: Joi.date().allow(null).min("now"),
});

const idChargeAppointmentSchema = Joi.object({
  id: Joi.number().required(),
});

export {
  createChargeAppointmentSchema,
  updateChargeAppointmentSchema,
  idChargeAppointmentSchema,
};
