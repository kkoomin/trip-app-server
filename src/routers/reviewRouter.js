require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  createReview,
  removeReview,
  selectReview,
} = require("../controllers/reviewController");

// router.post(process.env.ADDREVIEW, createReview);

router.post(process.env.DELETEREVIEW, removeReview);

router.post(process.env.GETREVIEW, selectReview);

router.post(process.env.CREATEREVIEW, createReview);

module.exports = router;
