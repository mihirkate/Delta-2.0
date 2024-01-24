const mongoose = require("mongoose");
main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
const User = mongoose.model("User", userSchema);
const user1 = new User({
  name: "eve",
  email: "eve@yahoo.com",
  age: 19,
});
user1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

User.insertMany([
  {
    name: "Tony",
    email: "tony@gnmail.com",
    age: 50,
  },
  {
    name: "Bruce",
    email: "bruce@gmail.com",
    age: 78,
  },
  {
    name: "peter",
    email: "peter@gmail.com",
    age: 35,
  },
])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
/*Operation Buffering 
Mongoose lets your start using your models immediately ,
without waiting for mongoose to establish a connection to Mongo db
*/

/* Model.find() -->Returns a query not a Promise but .then() can be used on that 
which maked .find({}) --> as thennable();*/

/* User.findById("657c131bf2c48b1380ac3082")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log();
  }); */

//Update.
/* 
User.findByIdAndUpdate("657c15f93c12f41d75161486", { age: 89 }, { new: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log();
  }); */

//Delete
/* User.deleteMany({ name: "eve" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log();
  }); */
User.findByIdAndDelete("657c1a21ad647b0e3d675444", { new: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log();
  });
