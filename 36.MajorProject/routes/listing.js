const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  validateReview,
} = require("../middlewares.js");

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    // if Schema.js was not there then multiple ifs were used
    /*  if (!req.body.listing) {
        throw new ExpressError(400, "Send Valid data for Listing");
      } */
    /*  Since we are using Joi  validator  therefore we need not need multiple ifs 
      
      
      
      
      we will use 
      listingSchema.validate(req.body);
      which will save our time 
      
      */

    /*  let result = listingSchema.validate(req.body);
      console.log(result);
      if (result.error) {
        throw new ExpressError(400, result.error);
      } */

    let newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    /*  if (!newlisting.title) {
        throw new ExpressError(400, "Title is Missing");
      }
      if (!newlisting.description) {
        throw new ExpressError(400, "Description is Missing");
      }
      if (!newlisting.location) {
        throw new ExpressError(400, "Location is Missing");
      }
      if (!newlisting.price) {
        throw new ExpressError(400, "price is Missing");
      } */
    req.flash("success", "New Listing Created!!");
    await newlisting.save();
    res.redirect("/listings");
  })
);
//Edit Route
router.get(
  "/:id/",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");
    if (!listing) {
      req.flash("error", "listing Not found");
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  })
);

//===========edit ===========

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "listing Not found");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);
// update
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    /* 
    if (!req.body.listing) {
      throw new ExpressError(400, "Send Valid data for Listing");
    } */
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated !!");
    res.redirect(`/listings/${id}`);
  })
);
//=======Delete listing======

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    console.log("Deleting listing with id:", id); // Log the id
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted !!");
    res.redirect("/listings");
  })
);
module.exports = router;
