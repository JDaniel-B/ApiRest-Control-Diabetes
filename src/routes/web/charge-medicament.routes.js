import { Router } from "express";
import { validatorHandler } from "../../middlewares/validator.handler.js";
import {
  createMedicamentSchema,
  idMedicamentSchema,
  updateMedicamentSchema,
} from "../../schemas/charge-medicament.schema.js";
import {
  changeStatus,
  create,
  find,
  findByUser,
  findOne,
  update,
} from "../../controllers/web/charge-medicament.cotroller.js";

const router = Router();

router
  .get("/find", find)

  .get("/findByUser/:id", findByUser)

  .get("/findOne/:id", validatorHandler(idMedicamentSchema, "params"), findOne)

  .post("/create", validatorHandler(createMedicamentSchema, "body"), create)

  .patch(
    "/update/:id",
    validatorHandler(idMedicamentSchema, "params"),
    validatorHandler(updateMedicamentSchema, "body"),
    update
  )

  .patch(
    "/change-status/:id",
    validatorHandler(idMedicamentSchema, "params"),
    changeStatus
  );

export default router;
