import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import handleValidationErrors from "../middlewares/handleValidation.js";
import validateOrder from "../validators/order.validator.js";
import { authenticate, authorization } from "../middlewares/auth.js";
import { getPageOfCourses, getCourseById } from "../controllers/customer.controller.js";

const router = Router();

router.route("/courses").get(getPageOfCourses);

router.route("/courses/:id").get(getCourseById);

router
  .route("/place")
  .post(authenticate, validateOrder, handleValidationErrors, createOrder);

export default router;
