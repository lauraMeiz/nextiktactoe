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
  let randomIndex;
  const click = (i) => {
    //setXchoice(!xChoice);

    const stepsCopy = [...steps];
    if (winner || stepsCopy[i]) return;

    steps[i] = "🍭";

    // setSteps(steps);
    setSteps((steps) => [...steps]);
    console.log(steps);
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
    randomIndex = randomIndexis(i);

    console.log(cell);
    return cell[randomIndex];
  };

  function computer(i) {
    //setXchoice(!xChoice);
    const stepsCopy = [...steps];
    if (winner || stepsCopy[i]) return;

    const cel = randomChoice(i);
    console.log(steps[cel] === "", cel);
    if (steps[cel] === "") {
      steps[cel] = "🍩";
    }
    if (steps.length !== 9) {
      computer();
    }
    setSteps((steps) => [...steps]);
    console.log(steps);

    setXchoice(false);
  }
  useEffect(() => {
    if (winner) return;
    if (xChoice) {
      computer();
    }
  }, [xChoice]);

  function reset() {
    setSteps(Array(9).fill(""));

    setXchoice(false);
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
      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}
