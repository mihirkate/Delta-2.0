const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignUpForm)
  .post(wrapAsync(userController.SignUp));

// signup
router.get("/signup", userController.renderSignUpForm);

// login
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
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
