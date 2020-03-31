const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const Customer = require("../models").Customer;
const { getAllPosts } = require("./common");

router.post("/customer/signup", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.pw;
  try {
    const result = await Customer.create({
      email,
      password
    });
    console.log(result);
    res.json({ message: email });
  } catch (err) {
    res.json({ message: false });
  }
});

module.exports = router;
