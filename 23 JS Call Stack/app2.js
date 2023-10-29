/* let request = saveToDb("apna College");
request
  .then(() => {
    console.log("Promis was resolved ");
    console.log(request);
  })
  .catch(() => {
    console.log("Promis was rejected ");
    console.log(request);
  }); */
function saveToDb(data) {
  return new Promise((resolve, reject) => {
    let internetSpeed = Math.floor(Math.random);
    if (internetSpeed > 4) {
      resolve("Data was sucess");
    } else {
      reject("Data was failed");
    }
  });
}
/* saveToDb("apna College")
  .then(() => {
    console.log("Promis was resolved ");
  })
  .catch(() => {
    console.log("Promis was rejected ");
  });
   */
// Promise chaining

saveToDb("apna College")
  .then((result) => {
    console.log("Promis was resolved ");
    console.log(result);
    return saveToDb("Hello wold im in save to DB ");
  })
  .then((result) => {
    console.log("data 2 was saved ");
    console.log(result);
  })
  .catch((error) => {
    console.log("Promis was rejected ");
    console.log(error);
  });
