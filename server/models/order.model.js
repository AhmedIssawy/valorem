import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },

  price: { type: Number, required: true },

  paymentMethod: {
    type: String,
    required: true,
    enum: ["credit_card", "paypal", "bank_transfer", "vfc", "insta_pay"],
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

const Order = model("Order", orderSchema);
export default Order;
