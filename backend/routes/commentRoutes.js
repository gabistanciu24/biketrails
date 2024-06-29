import express from "express";
import {} from "../controllers/postControllers.js";
import {
  createComment,
  updateComment,
} from "../controllers/commentControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", authGuard, createComment);
router.put("/:commentId", authGuard, updateComment);

export default router;
