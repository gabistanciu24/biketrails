import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
} from "../controllers/postControllers.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, createPost);
router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

export default router;
