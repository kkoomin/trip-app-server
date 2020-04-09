const passport = require("passport");
const rp = require("request-promise");
const Customer = require("../../models").Customer;
const Product = require("../../models").Product;
const Order = require("../../models").Order;

const kakaoPayPurchase = async (req, res) => {
  const item_name = req.body.name;
  const total_amount = req.body.total_amount; // total price로 고치기

  const options = {
    method: "POST",
    uri: "https://kapi.kakao.com/v1/payment/ready",
    form: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id", // 주문번호
      partner_user_id: "partner_user_id", // 유저 아이디
      item_name: item_name, //"초코파이", // 메인 주문 상품 외 2건
      quantity: 1, // 총 갯수
      total_amount: total_amount, // 2200, // 총액
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: "https://modoo.herokuapp.com/pay",
      fail_url: "https://www.daum.net",
      cancel_url: "https://www.kakao.com",
    },
    headers: {
      authorization: "KakaoAK bf8adb8c56ebe89007f9cd6bc97c9f90",
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  // userid랑 product id 참조해서 DB에 넣어줘야 함.
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
    console.log(err);
  }

  rp(options)
    .then((body) => {
      const kakaoResponse = JSON.parse(body);
      res.json({ message: kakaoResponse.next_redirect_pc_url });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { kakaoPayPurchase };
