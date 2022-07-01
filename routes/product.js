const express = require("express");
const {
  createProductValidator,
} = require("../middlewares/validators/createProductValidator");
const {
  updateProductValidator,
} = require("../middlewares/validators/updateProductvalidator");

const { authentication } = require("../middlewares/Auth/authentication");

const {
  createProduct,
  getAllProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

router.post("/", authentication, createProductValidator, createProduct);
router.get("/", authentication, getAllProduct);
router.get("/:id", authentication, getDetailProduct);
router.put("/:id", authentication, updateProduct);
router.delete("/:id", authentication, deleteProduct);

module.exports = router;
