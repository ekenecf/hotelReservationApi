import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import hotelsRoute from "./routes/hotels.js";

dotenv.config();

const app = express();

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Successfully connected to the mongoose"));

app.use(express.json());

// app.use("/api/auth", authRoute)
// app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomsRoute)

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

app.listen(2000, () => {
  console.log("connected to backend...!!");
});
