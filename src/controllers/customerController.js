const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middleware");
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
    console.log(result.id);
    req.session.userId = result.id;
    //console.log(result);
    res.json({ message: true });
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
