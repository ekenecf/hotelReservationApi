import express from "express";
import { createHotel, updateHotel, getAllHotel, getOneHotel, deleteHotel } from "../controllers/hotel.js";
import { verifyToken, checkIsAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").get(getAllHotel).post(checkIsAdmin, createHotel);
router.route("/:id").get(getOneHotel).delete(checkIsAdmin, deleteHotel).put(checkIsAdmin, updateHotel);


export default router;
