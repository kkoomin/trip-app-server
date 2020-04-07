require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  addToGood,
  deleteFromGood,
  searchProduct,
  searchProductPreview,
  searchTourPreview,
  searchTicketPreview,
} = require("../controllers/productController");

router.post(process.env.ADDTOLIKE, addToGood);

router.post(process.env.DELETEFROMLIKE, deleteFromGood);

router.post(process.env.GETPRODUCT, searchProduct);

router.post(process.env.GETPRODUCTPREVIEW, searchProductPreview);

router.post(process.env.GETTOURPREVIEW, searchTourPreview);

router.post(process.env.GETTICKETPREVIEW, searchTicketPreview);

module.exports = router;
