import express from "express";
const router = express.Router();
import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
} from "../controller/post.controller.js";

router.post("/create", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;
