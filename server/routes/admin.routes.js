import { Router } from "express";
import { authenticate, authorization } from "../middlewares/auth.js";
import { getPageOfUsers, updateCourse, createCourse } from "../controllers/admin.controller.js";

const router = Router();

router
  .route("/users")
  .get(authenticate, authorization(["admin"]), getPageOfUsers);

router.route("/courses").post(authenticate, authorization(["admin"]), createCourse);

router.route("/courses/:id").patch(authenticate, authorization(["admin"]), updateCourse)

export default router;
