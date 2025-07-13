import { Router } from "express";
import { createOrder, getOrderById } from "../controllers/order.controller.js";
import handleValidationErrors from "../middlewares/handleValidation.js";
import validateOrder from "../validators/order.validator.js";
import { authenticate, authorization } from "../middlewares/auth.js";
import {
  getPageOfCourses,
  getCourseById,
} from "../controllers/customer.controller.js";

import { redeemCoupon } from "../controllers/coupon.controller.js";

const router = Router();

router.route("/courses").get(getPageOfCourses);

router.route("/courses/:id").get(getCourseById);

router
  .route("/courses/:id/place")
  .post(authenticate, validateOrder, handleValidationErrors, createOrder);

router.route("/courses/:id/order").get(authenticate, getOrderById);

router.route("/courses/:id/order/redeem").post(authenticate, redeemCoupon);

export default router;
