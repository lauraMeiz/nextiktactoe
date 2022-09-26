import React, { useEffect, useState } from "react";
import Square from "./Square";
import checkWinner from "../Common/checkWinner";
import sleep from "../Common/sleep";
// import rand from "../Common/rand";
// import sleep from "../Common/sleep";

export default function Table() {
  const [steps, setSteps] = React.useState(Array(9).fill(""));
  const [xChoice, setXchoice] = useState(true);

  const winner = checkWinner(steps);
  const click = (i) => {
    setXchoice(!xChoice);

    const stepsCopy = [...steps];
    if (winner || stepsCopy[i]) return;

    steps[i] = "X";

    setSteps(steps);
    console.log(steps);
  };

  useEffect(() => {
    if (winner) return;
    if (!xChoice) {
      computer();
    }
  }, [xChoice]);

  function computer(i, j) {
    setXchoice(!xChoice);
    sleep(1000);

    const stepsCopy = [...steps];
    const cell = [];

    stepsCopy.forEach((index, i) => {
      if (index === "") {
        cell.push(i);

        return cell[i];
      }
    });
    const randomIndex = Math.floor(Math.random() * 9);

    const cel = cell[randomIndex];
    if (steps[cel] === "") {
      steps[cel] = "O";

      setSteps(steps);

      console.log(steps[i], "---", cel, randomIndex);
    }
  }

  return (
    <>
      <div className="table">
        {steps.map((step, i) => (
          <Square
            key={i}
            step={step}
            value={step}
            click={() => click(i)}
          ></Square>
        ))}
      </div>
    </>
  );
}
