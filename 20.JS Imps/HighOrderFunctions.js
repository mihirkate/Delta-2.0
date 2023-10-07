/* function multipleGreet(func, count) {
  for (let i = 0; i < count; i++) {
    func();
  }
}
let greet = function () {
  console.log("Greet");
};
/* multipleGreet(greet, 5); */
/* multipleGreet(function namaste() {
  console.log("Namaste Mihir ");
}, 5);
 */

function oddOrEven(request) {
  if (request == "odd") {
    let odd = function (n) {
      console.log(!(n % 2 == 0));
    };
    return odd;
  } else if (request == "even") {
    let even = function (n) {
      console.log(n % 2 == 0);
    };
    return even;
  } else {
    // console.log("Wrong Request");
  }
}
let request = "odd";
let func = oddOrEven(request);
func(5);
