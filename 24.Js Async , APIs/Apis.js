let url = "https://catfact.ninja/fact";
async function getFacts() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log("data is ", data.fact);
  } catch (error) {
    console.log("error is", error);
  }
}
