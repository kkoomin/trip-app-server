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

const app = express();

sequelize.sync();

const corsOptions = {
  origin: true,
  credentials: true
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
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false
  })
);
app.use(flash());

// router
app.use(process.env.CUSTOMER, customerRouter);

const startServer = () => {
  console.log(`server listening ${process.env.PORT}`);
};
app.listen(process.env.PORT, startServer);
