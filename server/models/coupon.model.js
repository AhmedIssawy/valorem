import { Schema, model } from "mongoose";
import { generateUniqueCode } from "../utils/coupon.js";

const CouponSchema = new Schema(
  {
    used: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
  },
  {
    timestamps: true,
  }
);

CouponSchema.pre("validate", function (next) {
  if (!this.code) {
    this.code = generateUniqueCode();
  }
  next();
});

const Coupon = model("Copoun", CouponSchema);
export default Coupon;
