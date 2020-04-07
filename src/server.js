require("dotenv").config();

const express = require("express");
const { join } = require("path");
const router = express.Router();

const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const helmet = require("helmet");
const morgan = require("morgan");
const KakaoStrategy = require("passport-kakao").Strategy;
const passport = require("passport");
// const passportConfig = require("./passport/index");
const session = require("express-session");
const sequelize = require("../models").sequelize;
const rp = require('request-promise')

const customerRouter = require("../src/routers/customerRouter");
const productRouter = require("../src/routers/productRouter");
const likesRouter = require("../src/routers/likesRouter");
const orderRouter = require("../src/routers/orderRouter");
const reviewRouter = require("../src/routers/reviewRouter");

const http = require("http");

const app = express();

sequelize.sync();
// passportConfig(passport);

const corsOptions = {
  origin: true,
  credentials: true,
};

//middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.static(join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(flash());

// router
app.use(process.env.CUSTOMER, customerRouter);
app.use(process.env.PRODUCT, productRouter);
app.use(process.env.LIKES, likesRouter);
app.use(process.env.ORDER, orderRouter);
app.use(process.env.REVIEW, reviewRouter);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new KakaoStrategy(
    {
      clientID: "71720065fd294c519d1cb7263b3e868a",
      callbackURL: "/kakao/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //로그인 되는 순간에 불러온다.
      console.log(profile);

      process.nextTick(() => {
        return done(null, profile);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  //값을 가져올떄(로그인 직후의 상황)
  done(null, user);
});

passport.deserializeUser((user, done) => {
  //세션에 저장된 값을 가져올 때
  done(null, user);
});

app.get("/kakao2", (request, response) => {
  console.log("kakakakakakaka");
  console.log(request.session);
});

app.get(
  "/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "http://www.naver.com",
  })
);

app.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    successRedirect: "http://70.12.225.186:3000/",
    failureRedirect: "http://www.naver.com",
  })
);

app.get("/kakao/logout", (request, response) => {
  request.logout();
  console.log(request.isAuthenticated());
  console.log(request.session);
  response.redirect("http://www.naver.com");
});

app.get("/kakao/pay", (req, res) => {
  const options = {
    method: 'POST',
    uri: 'https://kapi.kakao.com/v1/payment/ready',
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
      cancel_url: "https://www.kakao.com"
    },
    headers: {
      'authorization': 'KakaoAK d3dc9ca636e2b0467d6bb7c3a122f7a6',
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  };

  rp(options)
    .then((body) => {
      const kakaoResponse = JSON.parse(body);
      res.redirect(kakaoResponse.next_redirect_pc_url);
    })
    .catch((err) => {
      console.log(err)
    });
})

const startServer = () => {
  console.log(`server listening ${process.env.PORT}`);
};
app.listen(process.env.PORT, startServer);
