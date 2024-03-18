import { useState, useEffect } from "react";

export default function Counter() {
  let [countx, setCountx] = useState(0);
  let [county, setCounty] = useState(0);

  let counterx = () => {
    setCounty((currCount) => currCount + 1);
  };
  let countery = () => {
    setCounty((currCount) => currCount + 1);
  };

  useEffect(
    function pprintSomething() {
      console.log("this is side printing ");
    },
    [county, countx]
  );
  return (
    <div>
      <button onClick={counterx}>Add count </button>
      <p>your count is {countx}</p>
      <button onClick={countery}>Add count </button>
      <p>your count is {county}</p>
    </div>
  );
}
