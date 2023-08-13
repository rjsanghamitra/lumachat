import express from "express";
import {
  getUser,
  getUserFriends,
  addOrRemoveFriend,
} from "../controllers/users.js";
import { verification } from "../middleware/authorization.js";

const router = express.Router();

/* READ */
router.get("/:id", verification, getUser);
router.get("/:id/friends", verification, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verification, addOrRemoveFriend);

export default router;