import { Router } from "express";
import {
  changeStatus,
  create,
  find,
  findOne,
  select,
  update,
} from "../../controllers/web/patient.controller.js";
import { validatorHandler } from "../../middlewares/validator.handler.js";
import {
  createPatientSchema,
  idPatientSchema,
  updatePatientSchema,
} from "../../schemas/patient.schema.js";

const router = Router();

router
  .post("/create", validatorHandler(createPatientSchema, "body"), create)

  .get('/select', select)

  .get("/find", find)

  .get("/findOne/:id", validatorHandler(idPatientSchema, "params"), findOne)

  .patch(
    "/update/:id",
    validatorHandler(idPatientSchema, "params"),
    validatorHandler(updatePatientSchema, "body"),
    update
  )

  .patch(
    "/change-status/:id",
    validatorHandler(idPatientSchema, "params"),
    changeStatus
  );

export default router;
