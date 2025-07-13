import { body } from "express-validator";

const validateCoupon = [
  body("course")
    .notEmpty()
    .withMessage("Put a course id")
    .isMongoId()
    .withMessage("Need to be mongodb id"),
];

export { validateCoupon };
