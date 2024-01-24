// get the client
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const port = 8080;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "root",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
// Home page
app.get("/", (req, res) => {
  let q = " SELECT COUNT(*) AS userCount FROM USER;";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["userCount"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});
//show  user route
app.get("/user", (req, res) => {
  let q = " SELECT * FROM USER;";
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;

      res.render("user.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

//edit route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let q = `SELECT * FROM user WHERE ID='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

//update route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPassword, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE ID='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPassword != user.password) {
        res.render("wrongPass.ejs");
      } else {
        let q2 = `UPDATE USER SET username='${newUsername}' WHERE ID='${id}'`;
        connection.query(q2, (err, updateResult) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});
app.listen(port, () => {
  "Listening to the server ", port;
});
