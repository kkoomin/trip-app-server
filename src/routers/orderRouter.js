require("dotenv").config();
const express = require("express");
const router = express.Router();
const { saveToOrder } = require("../controllers/orderController");

router.post(process.env.ADDTOORDER, saveToOrder);

module.exports = router;
