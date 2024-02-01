const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listings.js");
// index Route
router.get("/", wrapAsync(listingController.index));
//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/:id/", wrapAsync(listingController.showListing));

//create route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing)
);

//===========edit ===========

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);
// update
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
);
//=======Delete listing======

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);
module.exports = router;

/* Note of this while learning 

wrapAsync(async (req, res, next) => {
    // if Schema.js was not there then multiple ifs would be  used
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

// let newlisting = new Listing(req.body.listing);
// newlisting.owner = req.user._id;
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
/*  req.flash("success", "New Listing Created!!");
      await newlisting.save();
      res.redirect("/listings");
    })  */
