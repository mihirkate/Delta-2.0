const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); //step 7
app.use(express.static(path.join(__dirname, "/public")));

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

/*====================================
Step 1
*/
app.get("/", (req, res) => {
  res.send("Welcome To home Page ");
});

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

/*====================================
Step 2
*/
app.get(
  "/testListing",
  wrapAsync(async (req, res) => {
    let sampleListing = new Listing({
      title: "MY Home",
      description: "lorwm 50",
      price: 1200,
      location: "Goa",
      country: "India",
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("sucess");
  })
);

//===========================================
// index route
/*====================================
Step 3
*/

app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

/*===========================================
//Accessing the new route 
/*====================================
Step 5 
*/
//=========================================

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.post(
  "/listings",
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

    await newlisting.save();
    res.redirect("/listings");
  })
);

//==============================================================================
//==============================================================================
// Step 4: Accessing the Show route
/* 
        let { id } = req.params;
  let listing = await Listing.findById(id);

//==============================================================================

*/
app.get(
  "/listings/:id/",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

//==============================================================================
// Step 6: Accessing the Show route
/* 
      let listing = await Listing.findById(id);

//==============================================================================






*/
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    /* let { id } = req.params;
    if (!req.body.listing) {
      throw new ExpressError(400, "Send Valid data for Listing");
    } */
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

//==============================================================================
// Step 7: Delete route
/* 
      let listing = await Listing.findById(id);

//==============================================================================



*/

app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    console.log("Deleting listing with id:", id); // Log the id
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

/* phase 2 part a
creating Reviews and adding revies in the mongo db databse 




============Reivies =============================
post route ================

*/
app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new Review saved");
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

/* Delete  Review 
action="/listings/<%=listing._id%>/reviews/<%=review._id%> " 

1. Review.findByIdAndDelete(reviewId);
2. using pull operator 




*/

app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  })
);
/* Phase 1 part c
1. defining a middle ware 
2. Define a custom wrapAsync function for handling errors 
module.exports = (fn) => {
  return (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
3. creating custom error class 
              class ExpressError extends Error {
                      constructor(statusCode, message) {
                      super();
                        this.status = statusCode;
                            this.message = message;
  }
}
module.exports = ExpressError;



 */

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






const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

/*====================================
Step 2
*/
app.get(
  "/testListing",
  wrapAsync(async (req, res) => {
    let sampleListing = new Listing({
      title: "MY Home",
      description: "lorwm 50",
      price: 1200,
      location: "Goa",
      country: "India",
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("sucess");
  })
);

//===========================================
// index route
/*====================================
Step 3
*/

app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

/*===========================================
//Accessing the new route 
/*====================================
Step 5 
*/
//=========================================

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.post(
  "/listings",
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

    await newlisting.save();
    res.redirect("/listings");
  })
);

//==============================================================================
//==============================================================================
// Step 4: Accessing the Show route
/* 
        let { id } = req.params;
  let listing = await Listing.findById(id);

//==============================================================================

*/
app.get(
  "/listings/:id/",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

//==============================================================================
// Step 6: Accessing the Show route
/* 
      let listing = await Listing.findById(id);

//==============================================================================






*/
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!req.body.listing) {
      throw new ExpressError(400, "Send Valid data for Listing");
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

//==============================================================================
// Step 7: Delete route
/* 
      let listing = await Listing.findById(id);

//==============================================================================



*/

app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    console.log("Deleting listing with id:", id); // Log the id
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

/* phase 2 part a
creating Reviews and adding revies in the mongo db databse 













/* 
/============Reiviews =============================
//post route ================

app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new Review saved");
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

/* Delete  Review 
action="/listings/<%=listing._id%>/reviews/<%=review._id%> " 

1. Review.findByIdAndDelete(reviewId);
2. using pull operator 




*/

app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  })
);
/* Phase 1 part c
1. defining a middle ware 
2. Define a custom wrapAsync function for handling errors 
module.exports = (fn) => {
  return (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
3. creating custom error class 
              class ExpressError extends Error {
                      constructor(statusCode, message) {
                      super();
                        this.status = statusCode;
                            this.message = message;
  }
}
module.exports = ExpressError;



 */

