const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("Connection success");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
let allchats = [
  {
    from: "Manish",
    to: "Puja",
    msg: "How are Your parents",
    created_at: new Date(),
  },
  {
    from: "Puja",
    to: "Manish",
    msg: "My parents are fine ,",
    created_at: new Date(),
  },
];
Chat.insertMany(allchats);
