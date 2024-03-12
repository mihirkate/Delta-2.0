import { useState } from "react";
import { generateTicket, sum } from "./helper";
import Ticket from "./Ticket";

export default function Lottery({ n = 3, winCondition }) {
  let [ticket, setTicket] = useState(generateTicket(n));
  let isWinning = winCondition(ticket);

  let buyTicket = () => {
    setTicket(generateTicket(n));
  };
  return (
    <div>
      <h1> Hi from Lottery </h1>
      <div className="ticket">
        <Ticket ticket={ticket} />
      </div>
      <br />
      <div>
        <button onClick={buyTicket}> Buy New Ticket </button>
      </div>
      <div>
        <h3>{isWinning && "Congrats for winning "}</h3>
      </div>
    </div>
  );
}
