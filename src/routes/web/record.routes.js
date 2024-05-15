import { Router } from "express";
import {
  changeStatus,
  create,
  find,
  findActive,
  findByUser,
  findOne,
  getDiabetes,
  replace,
  update,
} from "../../controllers/web/record.controller.js";
import { validatorHandler } from "../../middlewares/validator.handler.js";
import {
  createRecordSchema,
  idRecordSchema,
  updateRecordSchema,
} from "../../schemas/record.schema.js";

const router = Router();

router
  .get("/find", find)

  .get("/findActive", findActive)

  .get("/findByUser/:id", findByUser)

  .get("/findOne/:id", validatorHandler(idRecordSchema, "params"), findOne)

  .post("/create", validatorHandler(createRecordSchema, "body"), create)

  .post("/replace", validatorHandler(createRecordSchema, "body"), replace)

  .patch(
    "/update/:id",
    validatorHandler(idRecordSchema, "params"),
    validatorHandler(updateRecordSchema, "body"),
    update
  )

  .patch(
    "/change-status/:id",
    validatorHandler(idRecordSchema, "params"),
    changeStatus
  )

  .get("/get-diabetes", getDiabetes);

export default router;
