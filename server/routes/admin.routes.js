import { Router } from "express";
import { authenticate, authorization } from "../middlewares/auth.js";
import { getPageOfUsers } from "../controllers/admin.controller.js";

const router = Router();

router
  .route("/users")
  .get(authenticate, authorization(["admin"]), getPageOfUsers);

export default router;
