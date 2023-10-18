/* form.addEventListener("submit", function (event) {
  event.preventDefault();
  let user = document.querySelector("#user");
  let pass = document.querySelector("#password");
  console.dir(user);
  console.dir(user.value);
  console.dir(pass);
  console.dir(pass.value);
  alert(`Hii ${user.value} `);
}); */
let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
});

let user = document.querySelector("#user");
user.addEventListener("change", function (event) {
  event.preventDefault();
  console.log("changed");
  console.log("final value ", this.value);
});
user.addEventListener("input", function (event) {
  event.preventDefault();
  console.log("input event");
  console.log("final value ", this.value);
});
