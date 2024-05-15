import { Router } from "express";
import { getMedicament } from "../../controllers/mobile/medicament.controller.js";

const router = Router();

router.get("/get/:id", getMedicament);

export default router;
