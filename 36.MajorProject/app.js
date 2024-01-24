const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); //step 7
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser("secretcode"));
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

//
//===========================================
//Accessing the Public folder thorugh below path
///==========================================
app.use(express.static(path.join(__dirname, "public")));
app.get("/getSignedCookie", (req, res) => {
  res.cookie("color", "red", { signed: true });
  res.send("Signed cookiw sent ");
});
app.get();
app.get("/verify", (req, res) => {
  console.log(req.signedCookies);
  res.send("verified");
});

/*====================================
Step 1
*/
// using listings and reviews from /routes directory
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.get("/", (req, res) => {
  res.send("Welcome To home Page ");
});

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
