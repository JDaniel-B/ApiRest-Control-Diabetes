import { Router } from "express";
import { validateTokenMobile } from "../../middlewares/validator.token.js";
import auth from "./auth.routes.js";
import patient from "./patient.routes.js";
import appointment from "./appointment.routes.js";
import medicament from "./medicament.routes.js";

const router = Router();

router
  .use("/auth", auth)
  .use(validateTokenMobile)
  .use("/patient", patient)
  // .use("/patient", patient)
  // .use("/record", record)
  .use("/appointment", appointment)
  .use("/medicament", medicament);

export default router;
