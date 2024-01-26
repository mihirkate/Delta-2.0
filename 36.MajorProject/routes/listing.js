const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

router.post(
  "/",
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

router.get(
  "/:id/",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);
//===========edit ===========

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!req.body.listing) {
      throw new ExpressError(400, "Send Valid data for Listing");
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated !!");
    res.redirect(`/listings/${id}`);
  })
);
//=======Delete listing

router.delete(
  "/:id",
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
