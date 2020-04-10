const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middleware");
const Customer = require("../../models").Customer;
const Product = require("../../models").Product;
const Order = require("../../models").Order;
const Review = require("../../models").Review;

const addCustomer = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 12);
  try {
    const result = await Customer.create({
      email,
      password: hash,
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

const loginCustomer = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const findUser = await Customer.findOne({ where: { email } });
    const result = await bcrypt.compare(password, findUser.password);
    if (result) {
      req.session.userId = findUser.id;
      res.json({ message: true });
    } else {
      res.json({ message: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

/* const loginCustomer = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return res.json({ message: false });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.json({ message: true });
    });
  })(req, res, next);
}; */

const changeInfo = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Customer.update({
      email: email,
      password: password,
    });
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

module.exports = {
  addCustomer,
  loginCustomer,
  changeInfo,
};
