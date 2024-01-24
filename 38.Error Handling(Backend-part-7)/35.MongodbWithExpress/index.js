const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
/* const alertMsg = require("./public/app.js"); */
const ExpressError = require("./ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//===========================================
//Mongo Db COnnection Setup
///==========================================
main()
  .then(() => {
    console.log("Connection success");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

//
//===========================================
//Accessing the Public folder thorugh below path
///==========================================
app.use(express.static(path.join(__dirname, "public")));

//===========================================
//Accessing the index Route/ Home Page through below path
///==========================================

app.get("/", (req, res) => {
  res.render("home.ejs");
});

//=======================================================
//===============Index route ==========================
//===========================================
app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find();
    res.render("chats.ejs", { chats });
  } catch (error) {
    next(error);
  }
});
/*============================== New Show route ---------------------------- */
function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

app.get(
  "/chats/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      /* throw new ExpressError(404,"chat is Not founded "); */
      next(new ExpressError(404, "chat is Not founded "));
    }
    res.render("edit.ejs", { chat });
  })
);

//=======================================================
//===============new Chats ==========================
//===========================================
app.get("/chats/new", (req, res) => {
  throw new ExpressError(404, "Page is not found ");
  res.render("newChats.ejs");
});
//=======================================================
//===============Post ==========================
//===========================================
app.post("/chats", async (req, res) => {
  try {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    });
    console.log(msg);
    await newChat
      .save()
      .then((res) => {
        console.log("chat was saved");
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/chats");
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//=======================================================
//===============Edit==========================
//===========================================
app.get("/chats/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs", { chat });
  } catch (error) {
    next(error);
  }
});
//=======================================================
//===============Update ==========================
//===========================================
app.put("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runvalidators: true },
      { new: true }
    );
    // console.log(updatedChat);
    res.redirect("/chats");
  } catch (error) {
    next(error);
  }
});

//=======================================================
//===============DELETE/Destroy==========================
//===========================================

app.delete("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
  } catch (error) {
    next(error);
  }
});

/* ==============Error handling =========== */
app.use((err, req, res, next) => {
  console.log(err.name);
  next(err);
});
app.use((err, req, res, next) => {
  let { status = 500, message = "some error occured " } = err;
  res.status(status).send(message);
});

//=======================================================
//===============Connection To the Server  http://localhost:8080/chats ==========================
//===========================================

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
