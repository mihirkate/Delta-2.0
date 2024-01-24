let square = (n) => {
  return n * n;
};
console.log(square(7));

let id = setInterval(
  (func = () => {
    console.log("Hello world");
  }),
  2000
);
setTimeout(() => {
  clearInterval(id);
  console.log("Cleared Interval");
}, 10000);
