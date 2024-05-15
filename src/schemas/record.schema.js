import Joi from "joi";

const createRecordSchema = Joi.object({
  idPatient: Joi.number().required(),
  idUser: Joi.number().required(),
  idDiabetes: Joi.number().required(),
  date: Joi.date().max("now").required(),
});

const updateRecordSchema = Joi.object({
  idPatient: Joi.number().allow(null),
  idUser: Joi.number().allow(null),
  idDiabetes: Joi.number().allow(null),
  date: Joi.date().less("now").allow(null),
});

const idRecordSchema = Joi.object({
  id: Joi.number().required(),
});

export { createRecordSchema, updateRecordSchema, idRecordSchema };
