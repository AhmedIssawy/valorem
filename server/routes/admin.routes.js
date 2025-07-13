import { Router } from "express";
import { authenticate, authorization } from "../middlewares/auth.js";
import {
  getPageOfUsers,
  updateCourse,
  createCourse,
  deleteCourse,
} from "../controllers/admin.controller.js";
import { courseValidator } from "../validators/course.validator.js";
import handleValidationErrors from "../middlewares/handleValidation.js";
import { createCoupon } from "../controllers/coupon.controller.js";

const router = Router();

router.route("/users").get(authenticate, authorization, getPageOfUsers);

router
  .route("/courses")
  .post(
    authenticate,
    authorization,
    courseValidator,
    handleValidationErrors,
    createCourse
  );

router
  .route("/courses/:id")
  .patch(authenticate, authorization, updateCourse)
  .delete(authenticate, authorization, deleteCourse);

router.route("/coupon/create").post(authenticate, authorization, createCoupon);

export default router;
