import { Router } from "express";
import {
  changeStatus,
  create,
  find,
  findByUser,
  findFuture,
  findOne,
  update,
} from "../../controllers/web/charge-appointment.controller.js";
import { validatorHandler } from "../../middlewares/validator.handler.js";
import {
  createChargeAppointmentSchema,
  idChargeAppointmentSchema,
  updateChargeAppointmentSchema,
} from "../../schemas/charge-appointment.schema.js";

const router = Router();

router
  .get("/find", find)

  .get("/findFuture", findFuture)

  .get("/findByUser/:id", findByUser)

  .get(
    "/findOne/:id",
    validatorHandler(idChargeAppointmentSchema, "params"),
    findOne
  )

  .post(
    "/create",
    validatorHandler(createChargeAppointmentSchema, "body"),
    create
  )

  .patch(
    "/update/:id",
    validatorHandler(idChargeAppointmentSchema, "params"),
    validatorHandler(updateChargeAppointmentSchema, "body"),
    update
  )

  .patch(
    "/change-status/:id",
    validatorHandler(idChargeAppointmentSchema, "params"),
    changeStatus
  );

export default router;
