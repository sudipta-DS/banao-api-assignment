const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRouter = require("./routes/authRoutes");
const postRouter = require("./routes/postRoutes");
const verifyToken = require("./verifyToken");

dotenv.config({ path: __dirname + "/.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v2/auth", authRouter);
app.use("/api/v2/posts", verifyToken, postRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongoDB connected successfully.");
    app.listen(process.env.PORT || 5000, () => {
      console.log("server started successfully.");
    });
  })
  .catch((error) => {
    console.log(error);
  });
