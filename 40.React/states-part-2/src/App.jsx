import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LudoBoard from "./LudoBoard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LudoBoard />
    </>
  );
}

export default App;
