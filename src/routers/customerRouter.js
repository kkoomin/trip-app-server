const express = require("express");
const router = express.Router();
const Customer = require("../../models").Customer;

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Customer.create({
      email,
      password
    });
    console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/signin", async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Customer.findone({ where: { email, password } });
    console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
});

module.exports = router;
