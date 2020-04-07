const crypto = require("crypto");
const passport = require("passport");
const Customer = require("../../models").Customer;

const addCustomer = async (req, res, next) => {
  //console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Customer.create({
      email,
      password,
    });
    //console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

const loginCustomer = async (req, res, next) => {
  //console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Customer.findOne({ where: { email, password } });
    console.log(result);
    //console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

const changeInfo = async (req, res, next) => {
  //회원 정보 수정
  //console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
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
  //구매내역 조회
  try {
    const result = await Customer.findAll({});
    //console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

module.exports = { addCustomer, loginCustomer, changeInfo, searchItem };
