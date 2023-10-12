function sum(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log("you gave me ", args[i]);
  }
}
console.log(sum(1, 2, 3, 6, 7));
function min(a, b, c, d) {
  console.log(arguments);
}
min(1, 2, 3, 4, 7);
