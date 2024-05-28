import express from "express";
import { createPost, updatePost } from "../controllers/postControllers.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, createPost);
router.put("/:slug", authGuard, adminGuard, updatePost);

export default router;
