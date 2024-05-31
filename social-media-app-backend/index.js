import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./routes/auth.route.js";
import PostRouter from "./routes/post.route.js";
import CommentRouter from "./routes/comment.route.js";
import LikeRouter from "./routes/like.route.js";
import { verifyToken } from "./util/auth.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.options("*", cors());

app.use(cookieParser());

//auth validation
app.use(verifyToken);

// API routes go here!
app.use("/api/users", AuthRouter);
app.use("/api/posts", PostRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/likes", LikeRouter);

app.listen(process.env.PORT || 8081, () =>
  console.log(`Server is running on port ${process.env.PORT || 8081}`)
);

export default app;
