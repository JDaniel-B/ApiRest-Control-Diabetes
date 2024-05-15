import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  phone: Joi.string()
    .regex(/^[0-9]{8}$/)
    .required(),
  email: Joi.string().email().required(),
  rol: Joi.number().required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().allow(null).min(5).max(50),
  phone: Joi.string()
    .allow(null)
    .regex(/^[0-9]{8}$/),
  email: Joi.string().allow(null).email(),
  password: Joi.string()
    .allow(null)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{12,20}$/
    ),
  rol: Joi.number().allow(null),
});

const idUserSchema = Joi.object({
  id: Joi.number().required(),
});

export { createUserSchema, updateUserSchema, idUserSchema };
