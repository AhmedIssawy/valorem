import { Router } from "express";
import { Register, Login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", Login);

router.post("/register", Register);

export default router;
