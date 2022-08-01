const express = require("express");
const router = express.Router();
import { requireAuthentication } from "../middlewares";
import {
  createConnectAccount,
  getAccStatus,
  getAccBalance,
  payoutSetting,
} from "../controllers/stripe";
router.post(
  "/create-connect-account",
  requireAuthentication,
  createConnectAccount
);

router.post("/get-account-status", requireAuthentication, getAccStatus);
router.post("/get-account-balance", requireAuthentication, getAccBalance);
router.post("/payout-setting", requireAuthentication, payoutSetting);

module.exports = router;
