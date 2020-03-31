require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  addCustomer,
  loginCustomer
} = require("../controllers/customerController");

router.post(process.env.SIGNUP, addCustomer);

router.post(process.env.SIGNIN, loginCustomer);

module.exports = router;
