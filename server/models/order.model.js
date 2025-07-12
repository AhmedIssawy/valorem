import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },

  price: { type: Number, required: true },

  paymentMethod: {
    type: String,
    required: true,
    enum: [
      "Credit Card",
      "PayPal",
      "Bank Transfer",
      "VF Cash",
      "Insta pay",
    ],
  },
});

const Order = model("Order", orderSchema);
export default Order;
