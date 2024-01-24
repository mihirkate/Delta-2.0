let btn = document.querySelector("button");
let inp = document.querySelector("input");
let ul = document.querySelector("ul");
btn.addEventListener("click", function (event) {
  let item = document.createElement("li");
  item.innerText = inp.value;
  ul.appendChild(item);
  let deletebtn = document.createElement("button");
  deletebtn.innerText = "Delete";
  deletebtn.classList.add("delete");
  item.appendChild(deletebtn);
  console.log(item);
  inp.value = "";
});
/* 
let delBtns = document.querySelectorAll(".delete");
for (delbtn of delBtns) {
  delbtn.addEventListener("click", function () {
    let par = this.parentElement;
    console.log(par);
    par.remove();
  });
} */

ul.addEventListener("click", function (event) {
  if (event.target.nodeName == "BUTTON") {
    let listItem = event.target.parentElement;
    console.log(listItem);
    listItem.remove();
    console.log("deleted ");
  }
});
