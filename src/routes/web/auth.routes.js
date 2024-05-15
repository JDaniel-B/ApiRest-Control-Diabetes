import { Router } from "express";
import { login, logout, recoveryPassword } from "../../controllers/web/auth.controller.js";
import { validateToken } from "../../middlewares/validator.token.js";

const router = Router();

router.post("/login", login);
router.post("/reset-password", recoveryPassword)
router.use(validateToken);
router.get("/logout", logout);

export default router;
