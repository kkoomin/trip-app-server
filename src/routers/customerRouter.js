require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  addCustomer,
  loginCustomer,
  changeInfo,
  searchItem,
} = require("../controllers/customerController");

router.post(process.env.SIGNUP, addCustomer);

router.post(process.env.SIGNIN, loginCustomer);

router.post(process.env.UPDATEACCOUNT, changeInfo);

router.post(process.env.GETORDER, searchItem);

module.exports = router;
