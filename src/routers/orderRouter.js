require("dotenv").config();
const express = require("express");
const router = express.Router();
const { getOrderList } = require("../controllers/orderController");

router.post(process.env.GETORDERLIST, getOrderList);

module.exports = router;
