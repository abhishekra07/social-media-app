import express from "express";
const router = express.Router();
import {
  createComment,
  updateComment,
  deleteComment,
} from "../controller/comment.controller.js";

router.post("/create", createComment);
router.post("/update/:id", updateComment);
router.post("/delete/:id", deleteComment);

export default router;
