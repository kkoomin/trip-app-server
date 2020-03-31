const Customer = require("../../models").Customer;

const addCustomer = async (req, res, next) => {
  //console.log(req.body);
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
};

const loginCustomer = async (req, res, next) => {
  //console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Customer.findOne({ where: { email, password } });
    console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

module.exports = { addCustomer, loginCustomer };
