import "./App.css";
import { useState } from "react";
import Form from "./Form";
import Counter from "./Counter";
import Joker from "./Joker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Joker />
    </>
  );
}

export default App;
