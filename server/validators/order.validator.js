import { body } from "express-validator";
const validateOrder = [
  body("product")
    .notEmpty()
    .withMessage("Product information is required")
    .isObject()
    .withMessage("Product must be an object"),

  body("product._id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["paypal", "stripe", "credit_card", "cash"])
    .withMessage("Invalid payment method"),
];

export default validateOrder;
