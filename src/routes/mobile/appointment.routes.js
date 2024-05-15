import { Router } from "express";
import {
  detail,
  header,
} from "../../controllers/mobile/appointment.controller.js";

const router = Router();

router.get("/header/:id", header).get("/detail/:id", detail);

export default router;
