const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
  title: String,

  description: String,

  image: {
    type: String,
    default:
      "https://unsplash.com/photos/a-swimming-pool-with-lounge-chairs-and-palm-trees-HDX63jhsD3o",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/a-swimming-pool-with-lounge-chairs-and-palm-trees-HDX63jhsD3o"
        : v,
  },

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
