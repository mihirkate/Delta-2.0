const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "root",
});
let q = "INSERT INTO USER(ID,USERNAME,EMAIL,PASSWORD) VALUES ?";
/*Manual way of inserting the queries */
/* let user = [
  ["123d", "123_usernamed", "fabc@gmail.com", "f1234mysql"],
  ["123f", "123_usernamef", "dabc@gmail.com", "g1234mysql"],
]; */
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
let data = [];
for (let i = 0; i < 100; i++) {
  data.push(getRandomUser());
}
try {
  connection.query(q, [data], (err, res) => {
    if (err) throw err;
    console.log(res);
  });
} catch (err) {
  console.log(err);
}
connection.end();
