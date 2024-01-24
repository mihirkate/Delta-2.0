const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
app.use(express.static(path.join(__dirname, "public")));
app.set("veiw engine", "ejs");

app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  /* res.send("this is the Home"); */
  res.render("home.ejs");
});
app.get("/hello", (req, res) => {
  res.send("this is the Hello page");
  /* res.render("home.ejs"); */
});

app.get("/rolldice", (req, res) => {
  let diceValue = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice.ejs", { diceValue });
});

app.get("/ig/:username", (req, res) => {
  /*   const followers = ["Mihir", "Apna College", "Khapra"];*/
  let { username } = req.params;
  const instaData = require("./data.json");
  let data = instaData[username];
  if (data) {
    res.render("instagram.ejs", { data });
  } else {
    res.render("error.ejs");
  }
  console.log(data);
});

app.listen(port, () => {
  console.log("Listening for port No.", port);
});
