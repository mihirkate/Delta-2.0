const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview } = require("../middlewares.js");

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new Review saved");
    req.flash("success", "New Rewiew  Created!!");
    res.redirect(`/listings/${listing._id}`);

    /*  We have to add 
    validations as anyone
     can post with null reviews also
      
      adding validation by 
      const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
  
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };
  
  and handling those errors using wrapAsync();
  
  on server side --> using JOI 
  odule.exports.reviewSchema = Joi.object({
    review: Joi.object({
      rating: Joi.number().required().min(1).max(5),
      comment: Joi.string().required(),
    }).required(),
  });
     */
  })
);

//=====delete review

router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "New Rewiew  Deleted !!");
    res.redirect(`/listings/${id}`);
  })
);
module.exports = router;
