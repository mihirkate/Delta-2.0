const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/users.js");

// signup
router.get("/signup", userController.renderSignUpForm);
// post signup
router.post("/signup", wrapAsync(userController.SignUp));
// login
router.get("/login", userController.renderLoginForm);
// post
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);
// logout user
router.get("/logout", userController.logout);
module.exports = router;
