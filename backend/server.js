import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

// Create __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/trails", postRoutes);
app.use("/api/comments", commentRoutes);

// Static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error handling middleware
app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
