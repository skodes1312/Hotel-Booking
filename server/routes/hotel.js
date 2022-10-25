const express = require("express");
import formidable from "express-formidable";
const router = express.Router();

//middlewares
import { requireAuthentication, hotelOwner } from "../middlewares";

//controller function
import {
  createHotel,
  hotels,
  image,
  sellerHotels,
  remove,
  read,
  updateHotel,
} from "../controllers/hotel";

router.post("/create-hotel", requireAuthentication, formidable(), createHotel);
router.get("/hotels", hotels);
router.get("/hotel/image/:hId", image);
router.get("/seller-hotels", requireAuthentication, sellerHotels);
router.delete("/delete-hotel/:hId", requireAuthentication, hotelOwner, remove);
router.get("/hotel/:hId", read);
router.put(
  "/update-hotel/:hId",
  requireAuthentication,
  hotelOwner,
  formidable(),
  updateHotel
);

module.exports = router;
