import { useEffect, useState } from "react";

export default function Joker() {
  const URL = "https://official-joke-api.appspot.com/random_joke";
  let [joke, setJoke] = useState({});

  const getNewJoke = async () => {
    let response = await fetch(URL);
    let jsonRes = await response.json();
    console.log(jsonRes);
    setJoke({ setup: jsonRes.setup, punchline: jsonRes.punchline });
  };
  useEffect(() => {
    async function getFirstJoke() {
      let response = await fetch(URL);
      let jsonRes = await response.json();
      console.log(jsonRes);
      setJoke({ setup: jsonRes.setup, punchline: jsonRes.punchline });
    }
    getFirstJoke();
  }, []);
  return (
    <div>
      <h2>{joke.setup}</h2>
      <h2>{joke.punchline}</h2>
      <button onClick={getNewJoke}> Get new Joke </button>
    </div>
  );
}
