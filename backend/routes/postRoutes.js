import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, createPost);
router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost);

export default router;
