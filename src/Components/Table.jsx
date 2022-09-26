import React, { useEffect, useState } from "react";
import Square from "./Square";
import checkWinner from "../Common/checkWinner";
import sleep from "../Common/sleep";
// import rand from "../Common/rand";

import randomIndexis from "../Common/randomIndexis";
// import rand from "../Common/rand";
// import sleep from "../Common/sleep";

export default function Table() {
  const [steps, setSteps] = React.useState(Array(9).fill(""));
  const [xChoice, setXchoice] = useState(false);

  const winner = checkWinner(steps);
  const click = (i) => {
    //setXchoice(!xChoice);

    const stepsCopy = [...steps];
    if (winner || stepsCopy[i]) return;

    steps[i] = "X";

    // setSteps(steps);
    setSteps((steps) => [...steps]);
    setXchoice(true);
  };

  const randomChoice = (i) => {
    let cell = [];
    const stepsCopy = [...steps];

    stepsCopy.forEach((index, i) => {
      if (index === "") {
        cell.push(i);
      }
    });
    const randomIndex = randomIndexis();

    return cell[randomIndex];
  };

  function computer(i) {
    setXchoice(!xChoice);
    if (winner) return;

    const cel = randomChoice();
    if (!steps[cel]) {
      steps[cel] = "O";
      //setSteps(steps);
      setSteps((steps) => [...steps]);
      setXchoice(false);
    }
  }
  useEffect(() => {
    if (winner) return;
    if (xChoice) {
      computer();
    }
  }, [xChoice]);
  console.log(steps);

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
