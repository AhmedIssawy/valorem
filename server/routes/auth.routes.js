import { Router } from "express";
import { Register, Login, LogOut, getMe } from "../controllers/auth.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/auth.validator.js";
import handleValidationErrors from "../middlewares/handleValidation.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post("/login", validateLogin, handleValidationErrors, Login);

router.post("/register", validateRegister, handleValidationErrors, Register);

router.post("/logout", LogOut);

router.get("/me", authenticate, getMe);

export default router;
