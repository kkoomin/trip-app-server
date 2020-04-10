require("dotenv").config();

const passport = require("passport");
const rp = require("request-promise");
const Customer = require("../../models").Customer;
const Product = require("../../models").Product;
const Order = require("../../models").Order;

let userOrderCount;

// 주문번호 생성
const createOrderNum = async (userId) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const datePart = `${year}${month < 10 ? "0" + month : month}${
    day < 10 ? "0" + day : day
  }`;

  // DB에서 userordercount 데이터 받아와서 +1 해서 userOrderCount
  try {
    const result = await Customer.findOne({
      where: {
        id: userId,
      },
    });
    userOrderCount = result.order_count + 1;
  } catch (err) {}

  const userPart = `-${userId}-${userOrderCount}`;
  return datePart + userPart;
};

const kakaoPayPurchase = async (req, res) => {
  const userId = req.session.userId * 1;
  const item_name = req.body.name;
  const total_amount = req.body.total_amount * 1;
  const product_id = req.body.product_id * 1;
  const quantity = req.body.quantity * 1;
  const order_number = await createOrderNum(userId);

  const options = {
    method: "POST",
    uri: "https://kapi.kakao.com/v1/payment/ready",
    form: {
      cid: "TC0ONETIME",
      partner_order_id: order_number, // 주문번호
      partner_user_id: "partner_user_id", // 유저 아이디
      item_name: item_name, //"초코파이", // 메인 주문 상품 외 2건
      quantity, // 총 갯수
      total_amount: total_amount, // 2200, // 총액
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: "https://modoo.herokuapp.com/pay",
      fail_url: "https://www.daum.net",
      cancel_url: "https://www.kakao.com",
    },
    headers: {
      authorization: `KakaoAK ${process.env.ADMIN_KEY}`,
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  rp(options)
    .then(async (body) => {
      const kakaoResponse = JSON.parse(body);
      try {
        const insertOrder = await Order.create({
          quantity,
          order_number,
          customer_id: userId,
          product_id,
        });
        const increaseCount = await Customer.update(
          {
            order_count: userOrderCount,
          },
          { where: { id: userId } }
        );
      } catch (err) {
        console.log(err);
      }
      res.json({ message: kakaoResponse.next_redirect_pc_url });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { kakaoPayPurchase };
