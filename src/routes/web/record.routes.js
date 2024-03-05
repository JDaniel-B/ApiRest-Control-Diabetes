import { Router } from "express";
import {
  changeStatus,
  create,
  find,
  findOne,
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

  .get("/findOne/:id", validatorHandler(idRecordSchema, "params"), findOne)

  .post("/create", validatorHandler(createRecordSchema, "body"), create)

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
  );

export default router;
