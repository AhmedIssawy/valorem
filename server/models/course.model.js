import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      //change in future
      type: String,
      required: true,
      trim: true,
      default: "AI GEN",
    },
    image: {
      type: String,
      required: true,
    },
    videos: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product = model("Product", productSchema);
export default Product;
