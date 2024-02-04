const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const reviewController = require("../controllers/reviews.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middlewares.js");

//post review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

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

//=====delete review

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);
module.exports = router;
