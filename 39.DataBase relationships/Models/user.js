// getting-started.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("Connection Successful ");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema = new Schema({
  userName: String,
  address: [{ _id: false, location: String, city: String }],
});
const User = mongoose.model("User", userSchema);
const addUsers = async () => {
  let user1 = new User({
    userName: "sherlockHome",
    address: [
      {
        location: String,
        city: String,
      },
    ],
  });
  user1.address.push({ location: "Princess street", city: "kalbadevi" });
  let result = await user1.save();
  console.log(result);
};
addUsers();
