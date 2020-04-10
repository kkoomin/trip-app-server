const Customer = require("../../models").Customer;
const Order = require("../../models").Order;
const Product = require("../../models").Product;
const Review = require("../../models").Review;

const createReview = async (req, res, next) => {
  const userId = req.session.userId;
  const product_id = req.body.product_id;
  const star = req.body.star;
  const content = req.body.content;
  const order_number = req.body.order_number;
  try {
    const result1 = await Review.create({
      product_id,
      star,
      content,
      customer_id: userId,
    });
    const result2 = await Order.update(
      { is_review_written: true },
      { where: { order_number } }
    );
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

const removeReview = async (req, res, next) => {
  //후기 삭제
  //console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Customers.delete({ where: { email, password } });
    console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

const selectReview = async (req, res, next) => {
  //후기 조회
  //console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Customers.findAll({
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

module.exports = { createReview, removeReview, selectReview };
