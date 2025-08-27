import { body, param } from "express-validator";

const validateOrder = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["paypal", "bank_transfer", "credit_card", "vfc", "insta_pay"])
    .withMessage("Invalid payment method"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
];

export default validateOrder;
