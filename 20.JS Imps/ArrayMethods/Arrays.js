let arr = [2, 3, 4, 5];
let print = function (el) {
  console.log(el);
};
arr.forEach(print);
let double = arr.map((el) => {
  return el * 2;
});
console.log(double);
let studentInfo = [
  { name: "Mihir", marks: 56, age: 45 },
  { name: "kate", marks: 87, age: 98 },
  { name: "LMNOP", marks: 34, age: 45 },
];

let gpa = studentInfo.map((el) => {
  return el.marks / 10;
});
console.log(gpa);
