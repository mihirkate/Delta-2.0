let gameSeq = [];
let userSeq = [];

let btn = ["yellow", "red", "purple", "green"];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
  if (start == false) {
    console.log("started game");
    start = true;
    levelUp();
  }
});
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level} `;

  //choose rndom button and thgen flash
  let randomIdx = Math.floor(Math.random() * 3);
  let randomColor = btn[randomIdx];
  let randBtn = document.querySelector(`.${randomColor}`);
  /* console.log(randomIdx);
  console.log(randomColor);
  console.log(randBtn); */
  gameSeq.push(randomColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log(userColor);
  checkAns(userSeq.length - 1);
}
let allBtn = document.querySelectorAll(".btn");
for (btns of allBtn) {
  btns.addEventListener("click", btnPress);
}
function checkAns(index) {
  /* console.log(`current level is ${level}`); */

  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over !! your score was <b>${level}</b> <br> Press any key to start `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}
function reset() {
  start = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
