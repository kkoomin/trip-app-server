const Customer = require("../../models").Customer;

const saveToOrder = async (req, res, next) => {
  //구매 내역 생성
  //console.log(req.body);
  try {
    const result = await order.create({});
    console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

module.exports = { saveToOrder };
