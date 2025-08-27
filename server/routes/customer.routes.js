import { Router } from "express";
import { createOrder, getOrderById } from "../controllers/order.controller.js";
import handleValidationErrors from "../middlewares/handleValidation.js";
import validateOrder from "../validators/order.validator.js";
import { authenticate, authorization } from "../middlewares/auth.js";
import {
  getPageOfCourses,
  getCourseById,
  getCourseVideo,
} from "../controllers/customer.controller.js";

import { redeemCoupon } from "../controllers/coupon.controller.js";

const router = Router();

router.route("/").get(getPageOfCourses);

router.route("/order/redeem").post(authenticate, redeemCoupon);

router.route("/:id").get(getCourseById);

router.route("/:id/watch").get(authenticate, getCourseVideo);

router
  .route("/:id/place")
  .post(authenticate, validateOrder, handleValidationErrors, createOrder);

router.route("/:id/order").get(authenticate, getOrderById);


export default router;
