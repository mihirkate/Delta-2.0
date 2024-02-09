import { useState } from "react";

function Counter() {
  let [count, setCount] = useState(0);

  let increaseCount = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1> count={count} </h1>
      <button onClick={increaseCount}>Count is {count}</button>
    </div>
  );
}
export default Counter;
