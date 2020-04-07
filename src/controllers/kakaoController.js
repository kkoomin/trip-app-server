const passport = require("passport");
const rp = require("request-promise");
const Customer = require("../../models").Customer;

const kakaoPayPurchase = (req, res) => {
  const options = {
    method: "POST",
    uri: "https://kapi.kakao.com/v1/payment/ready",
    form: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "초코파이",
      quantity: 1,
      total_amount: 2200,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: "https://modoo.herokuapp.com",
      fail_url: "https://www.daum.net",
      cancel_url: "https://www.kakao.com",
    },
    headers: {
      authorization: "KakaoAK d3dc9ca636e2b0467d6bb7c3a122f7a6",
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  rp(options)
    .then((body) => {
      const kakaoResponse = JSON.parse(body);
      res.redirect(kakaoResponse.next_redirect_pc_url);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { kakaoPayPurchase };
