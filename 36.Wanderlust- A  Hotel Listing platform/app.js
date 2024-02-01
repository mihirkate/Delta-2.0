if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); //step 7
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser("secretcode"));

app.use(session(sessionOptions));
app.use(flash());
//====== using Passport as authenticator for our project
app.use(passport.initialize());
app.use(passport.session());

//
//===========================================
//Accessing the Public folder thorugh below path
///==========================================
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});
app.use("/", userRouter);
app.get("/getSignedCookie", (req, res) => {
  res.cookie("color", "red", { signed: true });
  res.send("Signed cookiw sent ");
});

//===========================================
//Mongo Db COnnection Setup
///==========================================
main()
  .then(() => {
    console.log("Connection success");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

/*====================================
Step 1
*/
// using listings and reviews from /routes directory
app.get("/", (req, res) => {
  res.send("Welcome To home Page ");
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found !!!!!!!"));
});

app.use((err, req, res, next) => {
  /* let statusCode = err.statusCode || 500; // Default to 500 if statusCode is not defined
  let message = err.message || "Internal Server Error"; */
  let { statusCode = 500, message = "something went Wrong " } = err;
  res.status(statusCode).render("error.ejs", { message });
  //res.status(statusCode).send(message);
});

//===========================================
//Accessing the server
///==========================================
app.listen(port, () => {
  console.log(`listening to thhe server ${port}`);
});
