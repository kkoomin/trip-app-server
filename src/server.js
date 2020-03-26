require("dotenv").config();
const express = require("express");
const { join } = require("path");

const app = express();

app.use(express.static(join(__dirname, "static")));

const startServer = () => {
  console.log(`server listening ${process.env.PORT}`);
};

app.listen(process.env.PORT, startServer);
