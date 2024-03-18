import "./App.css";
import { useState } from "react";
import Form from "./Form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Form />
    </>
  );
}

export default App;
