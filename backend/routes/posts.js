import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verification } from "../middleware/authorization.js";

const router = express.Router();

// read
router.get("/", verification, getFeedPosts);
router.get("/:userId/posts", verification, getUserPosts);

// update
router.patch("/:id/like", verification, likePost);

export default router;