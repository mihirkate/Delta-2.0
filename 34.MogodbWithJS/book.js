const mongoose = require("mongoose");
main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  price: { type: Number },
  discount: {
    type: Number,
    default: 0,
  },
  cateogry: {
    type: String,
    enum: ["fiction", "Nonfiction"],
  },
  genre: [String],
});
const Book = mongoose.model("Book", bookSchema);
let book1 = new Book({
  title: "Karnataka elections",
  author: "DK Reddy",
  price: 120,
  cateogry: "fiction",
  genre: ["RomCom,ComRedy"],
});

book1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
