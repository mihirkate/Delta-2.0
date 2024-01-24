async function greet() {
  return "hello";
}
greet()
  .then(() => {
    console.log("reolved ");
  })
  .catch((error) => {
    console.log("promise was rejected ", error);
  });

let demo = async () => {
  return 5;
};
