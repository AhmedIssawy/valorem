import { Router } from "express";

import { authenticate, authorization } from "../middlewares/auth.js";

import {
  getPageOfOrders,
  getOrderById,
  createOrder,
  markOrderAsPaid,
} from "../controllers/order.controller.js";

const router = Router();

router.route("/")
  .get(authenticate, authorization, getPageOfOrders)
  .post(authenticate, createOrder);

router.route("/:id")
  .get(authenticate, authorization, getOrderById)
  .patch(authenticate, authorization, markOrderAsPaid);




export default router;