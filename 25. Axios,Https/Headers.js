let url2 = "https://icanhazdadjoke.com/";
async function getJoke() {
  try {
    let config = { headers: { Accept: "application/json" } };
    let response = await axios.get(url2, config);
    console.log(response.data);
  } catch (error) {}
  console.log(error);
}
