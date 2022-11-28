import express from "express";
import { createHotel, updateHotel, getAllHotel, getOneHotel, deleteHotel } from "../controllers/hotel.js";

const router = express.Router();

router.route("/").get(getAllHotel).post(createHotel);
router.route("/:id").get(getOneHotel).delete(deleteHotel).put(updateHotel);


export default router;
