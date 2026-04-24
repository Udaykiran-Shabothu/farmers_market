const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");

// for all users
router.get("/", getProducts);
router.get("/:id", getSingleProduct);

// authorised
router.post("/", verifyToken, addProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;