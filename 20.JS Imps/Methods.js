/*const calci = {
  add: function (a, b) {
    return a + b;
  },
  sub: function (a, b) {
    return a - b;
  },
  div: function (a, b) {
    return a / b;
  },
  mul: function (a, b) {
    return a * b;
  },
};
console.log(calci); */

let arr = [1, 2, 3, 4];
function request1(arr, request) {
  for (let i = 0; i < arr.length; i++) {
    if (request > arr[i]) {
      console.log(arr[i]);
    }
  }
}
console.log(request1(arr, 6));
