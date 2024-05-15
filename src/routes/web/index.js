import { Router } from "express";
import auth from "./auth.routes.js";
import user from "./user.routes.js";
import patient from "./patient.routes.js";
import record from "./record.routes.js";
import chargeAppointment from "./chargeAppointment.routes.js";
import chargeMedicament from "./charge-medicament.routes.js";
import { validateToken } from "../../middlewares/validator.token.js";

const router = Router();

router
  .use("/auth", auth)
  .use(validateToken)
  .use("/user", user)
  .use("/patient", patient)
  .use("/record", record)
  .use("/appointment", chargeAppointment)
  .use("/medicament-charge", chargeMedicament);

export default router;
