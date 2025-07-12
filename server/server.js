import express from "express";
import cors from "cors";
import "dotenv/config.js";

// Import routes
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
// Import database connection
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5137",
    credentials: true,
  })
);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", customerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
