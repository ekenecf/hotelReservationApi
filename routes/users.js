import express from "express";
import {
  updateUser,
  getAllUser,
  getOneUser,
  deleteUser,
} from "../controllers/users.js";
import { forgotpassword, resetpassword } from "../controllers/auth.js";
import { verifyToken, checkUser, checkIsAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.route("/checkAuthentication").get(verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logged In");
// });
// //checkuser
// router.route("/checkUser/:id").get(checkUser, (req, res, next) => {
//   res.send("Hello user, you are logged In and can delete account");
// });
// // //check admin
// router.route("/checkAdmin/:id").get(checkIsAdmin, (req, res, next) => {
//   res.send("Hello Admin, you are logged In and can delete all account");
// });

router.route("/").get(checkIsAdmin, getAllUser);
router
  .route("/:id")
  .get(checkUser, getOneUser)
  .delete(checkUser, deleteUser)
  .put(checkUser, updateUser);

router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:token").patch(resetpassword);

export default router;
