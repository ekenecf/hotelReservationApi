import express from "express";
import Hotel from "../models/hotel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newHotel = await Hotel.create(req.body);
    res.status(200).json({
      numOfHotels: newHotel.length,
      message: "Successful",
      data: {
        newHotel,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Successful",
      data: {
        updatedHotel,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const hotel = await Hotel.find();
    res.status(200).json({
      message: "Successful",
      numOfHotels: hotel.length,
      data: {
        hotel,
      },
    });
  } catch (error) {
    next(error)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json({
      message: "Successful",
      numOfHotels: hotel.length,
      data: {
        hotel,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Successfully deleted hotel!!",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
