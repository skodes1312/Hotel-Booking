const express = require("express");
import formidable from "express-formidable";
const router = express.Router();

//middlewares
import { requireAuthentication } from "../middlewares";

//controller function
import { createHotel, hotels, image } from "../controllers/hotel";

router.post("/create-hotel", requireAuthentication, formidable(), createHotel);
router.get("/hotels", hotels);
router.get("/hotel/image/:hId", image);

module.exports = router;
