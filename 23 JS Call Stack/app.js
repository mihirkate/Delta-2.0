h1 = document.querySelector("h1");

/* function changeColor(color, delay, nextColorChange) {
  setTimeout(() => {
    h1.style.color = color;
    if (nextColorChange) nextColorChange();
  }, delay);
}
changeColor("red", 1000, () => {
  changeColor("green", 1000, () => {
    changeColor("yellow", 1000, () => {
      changeColor("blue", 1000);
    });
  });
}); */
function changeColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      h1.style.color = color;
      resolve("Color changed");
    }, delay);
  });
}
let reqPromise = changeColor("red");
changeColor("red")
  .then(() => {
    console.log("red color was completed ");
    return changeColor("orange", 1000);
  })
  .then(() => {
    console.log("Orange wass completed ");
    return changeColor("blue", 1000);
  })
  .then(() => {
    console.log("blue  wass completed ");
    return changeColor("green", 1000);
  });
