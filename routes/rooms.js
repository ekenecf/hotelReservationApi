import express from "express";
import { createRoom, updateRoom, getAllRoom, getOneRoom, deleteRoom } from "../controllers/room.js";
import { verifyToken, checkIsAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/:hotelId").get(getAllRoom).post(checkIsAdmin, createRoom);
router.route("/:id").get(getOneRoom).put(checkIsAdmin, updateRoom);
router.route("/:hotelId/:id").delete(checkIsAdmin, deleteRoom)

export default router;
