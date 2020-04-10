const Customer = require("../../models").Customer;
const Product = require("../../models").Product;
const Order = require("../../models").Order;

const getOrderList = async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    try {
      const result = await Product.findAll({
        attributes: ["name"],
        include: {
          model: Order,
          attributes: ["product_id", "order_number", "is_review_written"],
          where: {
            customer_id: userId,
          },
        },
      });
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({ message: false });
  }
};

module.exports = { getOrderList };
