require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const express = require("express");
const { join } = require("path");
const sequelize = require("../models").sequelize;
const customerRouter = require("../src/routers/customerRouter");

const app = express();

sequelize.sync();

const corsOptions = {
  origin: true,
  credentials: true
};

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

app.use("/customer", customerRouter);

const startServer = () => {
  console.log(`server listening ${process.env.PORT}`);
};

app.listen(process.env.PORT, startServer);
