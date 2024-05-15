import { Router } from "express";
import { login } from "../../controllers/mobile/auth.controller.js";

const router = Router();

router.post("/login", login);

export default router;
