import Hotel from "../models/hotel.js";

export const createHotel = async (req, res, next) => {
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
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Successful",
      data: {
        updatedHotel,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllHotel = async (req, res, next) => {
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
    next(error);
  }
};

export const getOneHotel = async (req, res, next) => {
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
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Successfully deleted hotel!!",
    });
  } catch (error) {
    next(error);
  }
};
