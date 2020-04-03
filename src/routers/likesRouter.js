require("dotenv").config();
const express = require("express");
const router = express.Router();
const { searchLike } = require("../controllers/likesController");

router.post(process.env.GETLIKE, searchLike);

module.exports = router;
