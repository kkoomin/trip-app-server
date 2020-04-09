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
  //console.log(req.body);
  try {
    const result = await Customer.create({
      email,
      password: hash,
    });
    //console.log(result);
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

const loginCustomer = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  //console.log(req.body);
  try {
    const findUser = await Customer.findOne({ where: { email } });
    const result = await bcrypt.compare(password, findUser.password);
    //console.log(result.id);
    req.session.userId = result.id;
    //console.log(result);
    res.json({ message: true });
  } catch (err) {
    console.log("-------------------" + err);
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
  //회원 정보 수정
  //console.log(req.body);
  try {
    const result = await Customer.update({
      email: email,
      password: password,
    });
    //console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

const searchItem = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const result = await Order.findAll({ where: { customer_id: userId } });
    //console.log(result);
    //res.json({ message: true });
  } catch (err) {
    console.log(err);
  }
};

const pleaseReview = async (req, res, next) => {
  try {
    const result = await Order.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const writeReview = async (req, res, next) => {
  const order_number = req.body.order_number;
  try {
    const result = await Review.create();
    const result2 = await Order.update(
      { is_review_wrriten: true },
      { where: { order_number } }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addCustomer,
  loginCustomer,
  changeInfo,
  searchItem,
  pleaseReview,
};
