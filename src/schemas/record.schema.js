import Joi from "joi";

const createRecordSchema = Joi.object({
  idPatiet: Joi.number().required(),
  idUser: Joi.number().required(),
  idDiabetes: Joi.number().required(),
  date: Joi.date().required(),
});

const updateRecordSchema = Joi.object({
  idPatiet: Joi.number().allow(null),
  idUser: Joi.number().allow(null),
  idDiabetes: Joi.number().allow(null),
  date: Joi.date().allow(null),
});

const idRecordSchema = Joi.object({
  id: Joi.number().required(),
});

export { createRecordSchema, updateRecordSchema, idRecordSchema };
