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

const router = Router();

router
  .route("/users")
  .get(authenticate, authorization(["admin"]), getPageOfUsers);

router
  .route("/courses")
  .post(
    authenticate,
    authorization(["admin"]),
    courseValidator,
    handleValidationErrors,
    createCourse
  );

router
  .route("/courses/:id")
  .patch(authenticate, authorization(["admin"]), updateCourse)
  .delete(authenticate, authorization(["admin"]), deleteCourse);

export default router;
