let btns = document.querySelectorAll("button");
/* 
for (btn of btns) {
  /*  btn.onclick = sayHello;
  btn.onmouseenter = function () {
    console.log("You entered a button");
  };
  console.dir(btns); 
} */
for (btn of btns) {
  /* btn.addEventListener("click", sayHello);
  btn.addEventListener("click", sayName); */
  btn.addEventListener("dblclick", function () {
    console.log("You double Clicked Me ");
  });
}

function sayHello() {
  alert("Hi ");
}
function sayName() {
  alert("Apna College");
}
