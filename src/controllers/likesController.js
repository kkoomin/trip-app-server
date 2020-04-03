const Customer = require("../../models").Customer;

const searchLike = async (req, res, next) => {
  //찜 목록 조회
  //console.log(req.body);
  try {
    const result = await likes.findAll({});
    console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

module.exports = { searchLike };
