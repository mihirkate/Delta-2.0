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
const orderSchema = new Schema({
  item: String,
  price: Number,
});
const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});
customerSchema.pre("findOneAndDelete", async () => {
  console.log("Pre is called ");
});
customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
    let result = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log(result);
  }
});
const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

/* const addOrder = async () => {
  let res = await Order.insertMany([
    { item: "samos ", price: 12 },
    { item: "Vadpaav ", price: 15 },
    { item: "Chocalate", price: 20 },
  ]);
  console.log(res);
}; */

/* const addCustomer = async () => {
  /*   let cust1 = new Customer({ name: "Rahul Kumar " });
  let order1 = await Order.findOne({ item: "Chocalate" });
  let order2 = await Order.findOne({ item: "Vadpaav " });
  cust1.orders.push(order1);
  cust1.orders.push(order2); */
/*  let res = await cust1.save(); 
  let res = await Customer.find({}).populate("orders");
  console.log(res[0]);
};
addCustomer(); */

/*  */
const addCust = async () => {
  let newCust = new Customer({
    name: "Karan",
  });
  let newOrder = new Order({
    item: "Paaav paav",
    price: 80,
  });
  newCust.orders.push(newOrder);
  await newOrder.save();
  await newCust.save();
  console.log("added new customer ");
  /* Printing The customer name  */
};
/* addCust(); */
const deltCust = async () => {
  let data = await Customer.findOneAndDelete("659fdbcbcd2640abea13912e");
  console.log(data);
};
deltCust();
