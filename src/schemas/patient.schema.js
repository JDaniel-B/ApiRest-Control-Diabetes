import Joi from "joi";

const createPatientSchema = Joi.object({
  CUI: Joi.string()
    .regex(/^[0-9]{13}$/)
    .required(),
  name: Joi.string().min(5).max(50).required(),
  direction: Joi.string()
    .regex(/^.{5,100}$/)
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{8}$/)
    .required(),
  email: Joi.string().email().max(100).required(),
});

const updatePatientSchema = Joi.object({
  CUI: Joi.string()
    .allow(null)
    .regex(/^[0-9]{13}$/),
  name: Joi.string().allow(null).min(5).max(50),
  direction: Joi.string()
    .allow(null)
    .regex(/^.{5,100}$/),
  phone: Joi.string()
    .allow(null)
    .regex(/^[0-9]{8}$/),
  email: Joi.string().allow(null).email().max(100),
  password: Joi.string()
    .allow(null)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{12,20}$/
    ),
});

const idPatientSchema = Joi.object({
  id: Joi.number().required(),
});

export { createPatientSchema, updatePatientSchema, idPatientSchema };
