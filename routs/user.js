const express = require("express");
const passport = require("passport");

const { signup, login } = require("../controllers/usersControllers");

//Mini express app
const router = express.Router();

router.post(
  "./login",
  passport.authenticate("local", { session: false }),
  login
);
router.post("./signup", signup);

module.exports = router;
