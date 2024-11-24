import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./db/index.js";
import app from "./app.js";

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully.");

    app.on("error", (error) => {
      console.error("Server error:", error);
      throw error;
    });

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

app.get("/", (req, res) => {
  return res.send("<h1>Hello</h1>");
});

startServer();
