import { Router } from "express";
import { getMe } from "../../controllers/mobile/patient.controller.js";

const router = Router();

router.get("/getMe", getMe);

export default router;
