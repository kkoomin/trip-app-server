const Product = require("../../models").Product;

const addToGood = async (req, res, next) => {
  //찜 목록에 넣기
  //console.log(req.body);
  try {
    const result = await Product.update({
      //좋아요에 관한 Columns Boolean 형식으로 만든 후 조정하면 좋을듯
    });
    //console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

const deleteFromGood = async (req, res, next) => {
  //찜 목록에서 빼기
  //console.log(req.body);
  try {
    const result = await Product.update({ where: { email, password } });
    //console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

const searchProduct = async (req, res, next) => {
  //상품 상세 조회
  //회원 정보 수정
  //console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await Product.findAll({
      email: email,
      password: password,
    });
    console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

const searchProductPreview = async (req, res, next) => {
  //상픔 리뷰
  //구매내역 조회
  try {
    const result = await Product.findAll({});
    //console.log(result);
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
};

const searchTourPreview = async (req, res, next) => {
  //console.log(req.body);
  //투어 목록 리뷰
  try {
    const result = await Product.findAll({
      where: {
        category: "tour",
      },
    });
    //console.log(result[0]);
    res.json({ message: result });
  } catch (err) {
    res.json({ message: false });
  }
};

const searchTicketPreview = async (req, res, next) => {
  //console.log(req.body);
  //투어 목록 리뷰
  try {
    const result = await Product.findAll({
      where: {
        category: "ticket",
      },
    });
    //console.log(result[0]);
    res.json({ message: result });
  } catch (err) {
    res.json({ message: false });
  }
};

module.exports = {
  addToGood,
  deleteFromGood,
  searchProduct,
  searchProductPreview,
  searchTourPreview,
  searchTicketPreview,
};
