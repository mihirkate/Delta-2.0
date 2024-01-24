const express = require("express");
const app = express();
/* console.dir(app); */
let port = 3000;
app.listen(port, () => {
  console.log("app is listening the port ", port);
});
/* app.use((req, res) => {
  /*   console.log(req); */
console.log("request Recieved ");
/* res.send({
    name: "Appla",
    season: "Winter",
    price: 250,
  }); 
  let code = "<h1>Mihir Kate </h1> <li>1</li><li>2</li>";
  res.send(code);
}); */
/*
app.get("/", (req, res) => {
  res.send("Hello i am root path");
});
app.get("/apple", (req, res) => {
  res.send("You contacted apple path");
});
app.get("/mango", (req, res) => {
  res.send("You contacted mango path");
});
app.get("*", (req, res) => {
  res.send("This path does not exist");
});
app.post("/", (req, res) => {
  res.send("you send a post ");
});
 */
app.get("/", (req, res) => {
  res.send("Hello i am root path");
});
app.get("/:username/:id", (req, res) => {
  let { username, id } = req.params;
  let htmlstr = `<h1>welcome to @${username} Your id is ${id}`;
  res.send(htmlstr);
});
app.get("/search", (req, res) => {
  let { q } = req.query;
  res.send(`<h1>Search results for the query ${q}</h1>`);
});
