import Joi from "joi";

const createMedicamentSchema = Joi.object({
  idRecord: Joi.number().required(),
  name: Joi.string().min(5).max(100).required(),
  days: Joi.number().required(),
  hour: Joi.number().required(),
  recommendations: Joi.string().min(5).max(100).required(),
  date: Joi.date().required(),
});

const updateMedicamentSchema = Joi.object({
  idRecord: Joi.number().allow("null"),
  name: Joi.string().allow("null").min(5).max(100),
  days: Joi.number().allow("null"),
  hour: Joi.number().allow("null"),
  recommendations: Joi.string().allow("null").min(5).max(100),
  date: Joi.date().allow("null").iso().min("now").required(),
});

const idMedicamentSchema = Joi.object({
  id: Joi.number().required(),
});

export { createMedicamentSchema, updateMedicamentSchema, idMedicamentSchema };
