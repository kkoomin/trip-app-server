require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createLikes, getLikes } = require("../controllers/likesController");

router.post(process.env.CREATELIKES, createLikes);

router.post(process.env.GETLIKES, getLikes);

module.exports = router;
