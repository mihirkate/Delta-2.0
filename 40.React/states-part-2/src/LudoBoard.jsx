import { useState } from "react";
export default function LudoBoard() {
  let [moves, setMoves] = useState({ blue: 0, red: 0, green: 0, yellow: 0 });
  let [arr, setArr] = useState(["no moves "]);
  /* -----------------update The blue color ----------------- */
  let updateBlue = () => {
    moves.blue += 1;
    setMoves({ ...moves });
    arr.push("blue moves");
    setArr([...arr, "blue moves "]);
    console.log(arr);
  };
  /* -----------------update The Red color ----------------- */

  let updateRed = () => {
    moves.red += 1;
    setMoves({ ...moves });
  };
  /* -----------------update The yellow color ----------------- */

  let updateYellow = () => {
    moves.yellow += 1;
    setMoves({ ...moves });
  };
  /* -----------------update The Green color ----------------- */

  let updateGreen = () => {
    moves.green += 1;
    setMoves({ ...moves });
  };

  return (
    <div>
      <p>game begins!!</p>
      {arr}
      {/* ---------------- Blue  ----------------*/}
      <div className="board">
        <p>blue moves ={moves.blue}</p>
        <button style={{ backgroundColor: "blue" }} onClick={updateBlue}>
          +1
        </button>

        {/* ---------------- Green  ----------------*/}

        <p>green moves ={moves.green}</p>
        <button style={{ backgroundColor: "green" }} onClick={updateGreen}>
          +1
        </button>

        {/* ---------------- Yellow   ----------------*/}
        <p>yellow moves ={moves.yellow}</p>
        <button style={{ backgroundColor: "yellow" }} onClick={updateYellow}>
          +1
        </button>

        {/* ---------------- Red  ----------------*/}
        <p>red moves ={moves.red}</p>
        <button style={{ backgroundColor: "red" }} onClick={updateRed}>
          +1
        </button>
      </div>
    </div>
  );
}
