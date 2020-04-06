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
app.use(process.env.review, reviewRouter);

//const app = require('express')();

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

/* 아래 형태로 주입
app.get('/login/google',
        passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/userinfo.email'],
            accessType: 'offline', approvalPrompt: 'force'}),
    (req, res)=>{    }
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
    );
    app.get('/login/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res)=>{//console.log(req.query);
      res.redirect('/login');
    });
    app.use(
      router.post("/kakao", (req, res, next) => {
        console.log(req.body);
    
        //res.json({ message: true });
      })
    );
*/

const startServer = () => {
  console.log(`server listening ${process.env.PORT}`);
};
app.listen(process.env.PORT, startServer);
