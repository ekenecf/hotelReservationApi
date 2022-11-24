import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,

}).then(() => console.log("Successful"))

app.listen(2000, () => {
  console.log("connected to backend...!!");
});
