/* let btn = document.querySelector("button");
let p = document.querySelector("p");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
btn.addEventListener("click", changecolor);
p.addEventListener("click", changecolor);
h1.addEventListener("click", changecolor);
h3.addEventListener("click", changecolor);
 */
/* function changecolor() {
  this.style.backgroundColor = "blue";
}
 */
/* let inp = document.querySelector("input");
inp.addEventListener("keydown", function (event) {
  console.log(event);
  console.log("Key was pressed ");
});
/* let inp = document.querySelector("input");
inp.addEventListener("keydown", function () {
  console.log("Key was released ");
}); 
let btn = document.querySelector("button");
btn.addEventListener(); */

let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Submitted");
});
