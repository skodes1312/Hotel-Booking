const express = require("express");
import { showData } from "../controllers/auth";
const router = express.Router();

router.get("/:data", showData);

module.exports = router;
