import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

import userRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blog.routes.js";
import commentRouter from "./routes/comment.routes.js";

app.use("/api/v1/", userRouter);
app.use("/api/v1/", blogRouter);
app.use("/api/v1/", commentRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export default app;
