import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import hotelsRoute from "./routes/hotels.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";

dotenv.config({path: "./utils/.env"});
const app = express();
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Db connect success!!"));

app.use(
  fileupload({
    useTempFiles: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(9000, () => {
  console.log("connected to port 9000...!!");
});
