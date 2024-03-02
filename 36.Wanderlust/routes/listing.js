if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
// const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index route)
router.get("/", wrapAsync(listingController.index));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new route)
router.get("/new", isLoggedIn, listingController.renderNewForm);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
router.get("/:id", wrapAsync(listingController.showListing));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(create post)
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(edit)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(update)
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete)
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;
