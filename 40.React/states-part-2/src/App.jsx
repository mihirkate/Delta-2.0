import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LudoBoard from "./LudoBoard";
import ToDoList from "./ToDoList";
import Lottery from "./Lottery";
import Ticket from "./Ticket";
import TicketNum from "./TicketNum";
import { sum } from "./helper";
function App() {
  let winCondition = (ticket) => {
    return sum(ticket) === 15;
  };

  return (
    <>
      <Lottery n={3} winningsum={17} winCondition={winCondition} />
    </>
  );
}

export default App;
