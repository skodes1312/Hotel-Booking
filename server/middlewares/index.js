import { expressjwt } from "express-jwt";
import Hotel from "../models/hotel";

export const requireAuthentication = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});

export const hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hId).exec();
  let owner = hotel.postedBy._id == req.auth._id;
  if (!owner) {
    return res.status(403).send("Unauthorized Access.");
  }
  next();
};
