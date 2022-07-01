const express = require("express");
const router = express.Router();

const product = require("./product");

const user = require("./user");

router.use("/user", user);
router.use("/product", product);

module.exports = router;
