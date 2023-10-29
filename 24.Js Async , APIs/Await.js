/* function getNum() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let num = Math.floor(Math.random() * 10) + 1;
      console.log(num);
      resolve();
    }, 1000);
  });
}
async function demo() {
  await getNum();
  await getNum();
  await getNum();
} */
h1 = document.querySelector("h1");
function changeColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let num = Math.floor(Math.random() * 5) + 1;
      if (num > 3) {
        reject("Promise Rejected ");
      }
      h1.style.color = color;
      console.log("Color changed to ", color);
      resolve("Color changed");
    }, delay);
  });
}
async function demo2() {
  try {
    await changeColor("red", 1000);
    await changeColor("orange", 1000);
    await changeColor("green", 1000);
    await changeColor("blue", 1000);
  } catch (error) {
    console.log("error caught");
    console.log(error);
  }
  let a = 6;
  console.log(a);
  console.log("new No is ", a + 3);
}
