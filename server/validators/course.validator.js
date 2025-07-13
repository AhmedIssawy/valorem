import { body, param } from "express-validator";

const courseValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ObjectId"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["credit_card", "paypal", "bank_transfer", "vfc", "insta_pay"])
    .withMessage("Payment method must be one of: credit_card, paypal, bank_transfer, vfc, insta_pay"),
];

export { courseValidator };
