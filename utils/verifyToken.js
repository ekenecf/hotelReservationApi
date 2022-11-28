import jwt from "jsonwebtoken";
import { createError } from "./error.js";

//To verify token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated"));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token not valid"));
    }
    // You can assign any new property to the req eg req.ekene = user
    req.user = user;
    next();
  });
};

//checkUser before any action is carried out
export const checkUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    //we dont need next in the verify token fxn if not it will go to the users route
    // here req.user.id is coming from the token we signed.
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are Not authorised"));
    }
  });
};

//check whether admin exists
export const checkIsAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    //we dont need next in the verify token fxn if not it will go to the users route
    // here req.user.isAdmin is coming from the token we signed.
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are Not authorised"));
    }
  });
};
