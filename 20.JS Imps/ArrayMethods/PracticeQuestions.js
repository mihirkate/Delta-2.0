let mults = [10, 20, 30, 40, 12, -40];
/*let ans = mults.every((el) => el % 10 == 0);
console.log(ans); */

let min = mults.reduce((res, el) => {
  if (el < res) {
    return el;
  } else {
    return res;
  }
});
console.log(min);
