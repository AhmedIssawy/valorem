import { Router } from "express";
import { Register, Login, LogOut } from "../controllers/auth.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/auth.validator.js";
import handleValidationErrors from "../middlewares/handleValidation.js";

const router = Router();

router.post("/login", validateLogin, handleValidationErrors, Login);

router.post("/register", validateRegister, handleValidationErrors, Register);

router.post("/logout", LogOut);

export default router;
