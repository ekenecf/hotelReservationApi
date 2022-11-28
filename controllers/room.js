import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
//   const newRoom = new Room(req.body);
//   Since theres is relationship btw room and hotel we are creating a new try catch block to get the hotel id
  try {
    // const savedRoom = await newRoom.save();
    const savedRoom = await Room.create(req.body);
    try {
      //We update the hotel because we need to update the room column with the hotel_Id which is the relationship btw both
      //Therefore we use the mongoDB push method to push the room back to the hotel.
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(201).json({
      message: "Created successfully",
      data: {
        savedRoom,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Successful",
      data: {
        updatedRoom,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRoom = async (req, res, next) => {
  try {
    const room = await Room.find();
    res.status(200).json({
      message: "Successful",
      numOfRooms: room.length,
      data: {
        room,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json({
      message: "Successful",
      numOfRooms: Room.length,
      data: {
        room,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    try {
        //We update the hotel because we need to update the room column with the hotel_Id which is the relationship btw both
        //Therefore we use the mongoDB pull method to pull the room out of the hotel.
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (error) {
        next(error);
      }
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Successfully deleted Room!!",
    });
  } catch (error) {
    next(error);
  }
};
