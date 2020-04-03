const Customer = require("../../models").Customer;

const createReview = async (req, res, next) => {
  //후기 생성
  //console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Customers.create({
      email,
      password
    });
    console.log(result);
    res.json({ message: true });
  } catch (err) {
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
      password: password
    });
    console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

module.exports = { createReview, removeReview, selectReview };
