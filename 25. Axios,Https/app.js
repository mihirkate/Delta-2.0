let url = "https://catfact.ninja/fact";
let url2 = "https://dog.ceo/api/breeds/image/random";
let btn = document.querySelector("button");
/* btn.addEventListener("click", async () => {
  /*  let fact = await getFacts();
  console.log(fact);
  let p = document.querySelector("#result");
  p.innerText = fact; 
});*/
btn.addEventListener("click", async () => {
  let link = await getImage();
  let img = document.querySelector("img");
  /* img.src = link; */
  img.setAttribute("src", link);
  console.log(link);
});

/* async function getFacts() {
  try {
    let response = await axios.get(url);
    return response.data.fact;
  } catch (error) {
    console.log("error", error);
    return "No fact found";
  }
} */

async function getImage() {
  try {
    let response = await axios.get(url2);
    return response.data.message;
    /* return response.data.fact; */
  } catch (error) {
    console.log("error", error);
    return "No Imagefact found";
  }
}
