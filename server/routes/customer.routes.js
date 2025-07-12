import { Router } from "express";
import { createOrder } from "../controllers/order.controller";
import handleValidationErrors from "../middlewares/handleValidation";
import { validateOrder } from "../validators/order.validator";
const router = Router();

router.route("/place", validateOrder, handleValidationErrors, createOrder);
