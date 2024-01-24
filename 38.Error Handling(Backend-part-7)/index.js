/* =========================Middle Wares ===================================
It is an Intermediatory in between request and response 

request ------>>>> MIDDLEWARE ------->response 


Middleware in express are functios that come into play after the server recieves the request 
and before the request and  before the response is sent to client


common middle ware 

. method-override
.express.static
.express.urlencoded()





 */

const express = require("express");
const app = express();
const port = 8080;
const ExpressError = require("./ExpressError.js");

/* app.use((req, res) => {
  console.log("hi i am middleware");
  res.send(" middleware finished");
}); */

/*=========================Using next();=========================
        //    https://expressjs.com/en/4x/api.html#app.use
//https://blog.bitsrc.io/5-express-middleware-libraries-every-developer-should-know-94e2728f7503
*/
/* app.use((req, res, next) => {
  console.log("hi i am 1st  middleware");
  next();
});
app.use((req, res, next) => {
  console.log("hi i am 2st  middleware");
  next();
}); */
/*=========================Using next();========================= 
Creating a utility middle ware 
Logger package 
*/
/*

/* ==================Logger package ================== */

/* app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.time);
  next();
}); */

/* ========================app. use() callback =================================





*/
/* app.use("/random", (req, res, next) => {
  console.log("hi i am for the root ");
  next();
}); */

/* =============================For api ================================================ */

app.use("/api", (req, res, next) => {
  let { token } = req.query;
  if (token === "giveacess") {
    next();
  }
  throw new ExpressError(400, "Access Denied");
});
/* =========== 404 ====================== */
/* app.use((req, res) => {
  res.send("page Not found ");
}); */

app.get("/", (req, res) => {
  res.send("Hi im Root");
});
app.get("/api", (req, res) => {
  res.send("data");
});
app.get("/random", (req, res) => {
  res.send("random Route ");
});
app.get("/err", (req, res) => {
  abcd = abcd;
  res.send("err Route ");
});
app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access forbidden");
});
/*======================Error Handling ==============================
 Express has its own error handling system.

*/

app.use((err, req, res, next) => {
  let { status = 501, message = "Error in the server " } = err;
  /* abcd = abcd; */
  res.sendStatus(status).send(message);
  next(err);
});

app.listen(port, () => {
  console.log(`Listening to the Server ${port}`);
});
