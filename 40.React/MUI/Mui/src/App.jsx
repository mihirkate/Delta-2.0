import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button variant='outlined'>Outlined</Button>
    </>
  );
}

export default App;
