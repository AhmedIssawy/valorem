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

  body("product.price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ gt: 0 })
    .withMessage("Product price must be a positive number"),

  body("shippingAddress")
    .notEmpty()
    .withMessage("Shipping address is required")
    .isObject()
    .withMessage("Shipping address must be an object"),

  body("shippingAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),

  body("shippingAddress.postalCode")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required"),

  body("shippingAddress.country")
    .trim()
    .notEmpty()
    .withMessage("Country is required"),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["paypal", "stripe", "credit_card", "cash"])
    .withMessage("Invalid payment method"),
];

export default validateOrder;
