if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );
// .post(upload.single("listing[image]"), (req, res) => {
//   res.send(req.file);
// });

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing) // update route
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// index Route
// router.get("/", wrapAsync(listingController.index));

//Show Route
// router.get("/:id/", wrapAsync(listingController.showListing));

// //create route
// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   wrapAsync(listingController.createListing)
// );

//===========edit ===========

// // update
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingController.updateListing)
// );
// //=======Delete listing======

// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.destroyListing)
// );
module.exports = router;
// ============================================
