require("dotenv").config();
const express = require("express");
const router = express.Router();
const { kakaoPayPurchase } = require("../controllers/kakaoController");

router.post(process.env.PAY, kakaoPayPurchase);

module.exports = router;
