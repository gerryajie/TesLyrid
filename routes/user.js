const express = require("express");
const {
  signUpValidator,
} = require("../middlewares/validators/signUpValidator");

const {
  signInValidator,
} = require("../middlewares/validators/signInValidator");

const { authentication } = require("../middlewares/Auth/authentication");

const {
  createUser,
  getDetailUser,
  deleteUser,
  updateUser,
  login,
} = require("../controllers/user");

const router = express.Router();

router.post("/signup", signUpValidator, createUser);

router.post("/login", signInValidator, login);

router.get("/", authentication, getDetailUser);
router.put("/", authentication, updateUser);
router.delete("/", authentication, deleteUser);

module.exports = router;
