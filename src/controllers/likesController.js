const Customer = require("../../models").Customer;
const Product = require("../../models").Product;
const Likes = require("../../models").Likes;

const createLikes = async (req, res, next) => {
  //찜 목록 조회
  //console.log(req.body);
  try {
    const customer_id = req.session.userId;
    const product_id = req.body.product_id;
    const result = await Likes.create({ customer_id, product_id });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

const getLikes = async (req, res, next) => {
  try {
    const customer_id = req.session.userId;
    const result = await Product.findAll({
      attributes: ["id", "photo", "name", "adult_price"],
      include: {
        model: Likes,
        attributes: ["product_id"],
        where: {
          customer_id,
        },
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

module.exports = { createLikes, getLikes };
