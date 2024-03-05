import { Router } from "express";
import {
  changeStatus,
  create,
  find,
  findOne,
  update,
} from "../../controllers/web/user.controller.js";
import { validatorHandler } from "../../middlewares/validator.handler.js";
import {
  createUserSchema,
  idUserSchema,
  updateUserSchema,
} from "../../schemas/user.schema.js";

const router = Router();

router
  .post("/create", validatorHandler(createUserSchema, "body"), create)

  .get("/find", find)

  .get("/findOne", findOne)

  .patch(
    "/update/:id",
    validatorHandler(idUserSchema, "params"),
    validatorHandler(updateUserSchema, "body"),
    update
  )

  .patch(
    "/change-status/:id",
    validatorHandler(idUserSchema, "params"),
    changeStatus
  );

export default router;
