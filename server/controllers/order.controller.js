import Order from "../models/order.model.js";
import AsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Product from "../models/course.model.js";
import sendResponse from "../handlers/response.handler.js";

const getPageOfOrders = AsyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .skip(skip)
    .limit(Number(limit))
    .sort({ _id: -1 })
    .populate("user", "name email")
    .populate("product", "name price")
    .select("-__v")
    .lean();

  sendResponse(res, {
    message: "Orders retrieved successfully",
    success: true,
    statusCode: 200,
    data: orders,
  });
});

const getOrderById = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("user", "name email")
    .populate("product", "name price")
    .lean();
  res.status(200).json({
    data: order,
  });
});

const createOrder = AsyncHandler(async (req, res) => {
  const { paymentMethod, email } = req.body;
  const { id } = req.params;
  const user = req.user._id;
  const productDetails = await Product.findById(id).lean();

  if (!productDetails) {
    return res.status(404).json({ message: "Course not found" });
  }

  // Check if user already owns this course
  const userDetails = await User.findById(user);
  const alreadyOwns = userDetails.courses.some(
    (courseId) => courseId.toString() === id
  );

  if (alreadyOwns) {
    return res.status(400).json({ message: "You already own this course" });
  }

  // Create the order
  const order = new Order({
    user,
    product: id,
    price: productDetails.price,
    paymentMethod,
  });

  await order.save();

  // Send email notification (you'll implement email service)
  console.log(`Order created for ${email}. Order ID: ${order._id}`);
  console.log(`Payment instructions: Please contact 01033908985 for payment`);

  res.status(201).json({
    message: "Order created successfully. Please contact 01033908985 for payment.",
    data: {
      order,
      paymentPhone: "01033908985",
      course: productDetails
    },
  });
});

const markOrderAsPaid = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const order = await Order.findById(id).populate('product');
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.paid) {
    return res.status(400).json({ message: "Order is already marked as paid" });
  }

  // Mark order as paid
  order.paid = true;
  await order.save();

  // Add course to user's courses
  const user = await User.findById(order.user);
  if (!user.courses.includes(order.product._id)) {
    user.courses.push(order.product._id);
    await user.save();
  }

  sendResponse(res, {
    message: "Order marked as paid and course added to customer",
    success: true,
    statusCode: 200,
    data: order,
  });
});

export { getPageOfOrders, getOrderById, createOrder, markOrderAsPaid };
