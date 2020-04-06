require("dotenv").config();

const express = require("express");
const { join } = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const sequelize = require("../models").sequelize;

const customerRouter = require("../src/routers/customerRouter");
const productRouter = require("../src/routers/productRouter");
const likesRouter = require("../src/routers/likesRouter");
const orderRouter = require("../src/routers/orderRouter");
const reviewRouter = require("../src/routers/reviewRouter");

const app = express();

sequelize.sync();

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

const startServer = () => {
  console.log(`server listening ${process.env.PORT}`);
};
app.listen(process.env.PORT, startServer);
