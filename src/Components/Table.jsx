import React, { useEffect, useState } from "react";
import Square from "./Square";
import checkWinner from "../Common/checkWinner";

import randomIndexis from "../Common/randomIndexis";

// import sleep from "../Common/sleep";

export default function Table() {
  const [steps, setSteps] = React.useState(Array(9).fill(""));
  const [xChoice, setXchoice] = useState(false);
  const [modal, setModal] = useState(0);

  let winnerSave = localStorage.getItem("winner")
    ? JSON.parse(localStorage.getItem("winner"))
    : [];

  const winner = checkWinner(steps);

  useEffect(() => {
    if (winner) {
      console.log(winner);
      setModal(1);

      if (winnerSave.length < 10) {
        winnerSave.push(winner);
        localStorage.setItem("winner", JSON.stringify(winnerSave));
      } else {
        winnerSave.shift(winner);
        winnerSave.push(winner);
        localStorage.setItem("winner", JSON.stringify(winnerSave));
      }
    }
  }, [winner]);

  let randomIndex;

  const click = (i) => {
    //setXchoice(!xChoice);

    const stepsCopy = [...steps];
    if (winner) return;
    if (stepsCopy[i]) return;

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
    if (!reset || steps[cel] === "") {
      steps[cel] = "🍩";
    } else {
      computer();
    }
    console.log(reset);
    // }
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

  const reset = () => {
    setSteps(Array(9).fill(""));
    setModal(0);
    setXchoice(false);
  };

  return (
    <>
      <div className="table-row">
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
      </div>
      <div className="button-row">
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      {modal ? (
        <div className="winner-row">
          <div className="modal" onClick={reset}>
            {" "}
            <h1>Winner is {winner} !!</h1>
            <div>
              {" "}
              <button className="button button-modal" onClick={reset}>
                Play Again?{" "}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="winner-history-row">
        {" "}
        <h6>Last 10 winners were: </h6>
        {winnerSave.map((m, i) => (
          <div key={i}>
            {" "}
            <span>{i + 1}</span> {m}
          </div>
        ))}
      </div>
    </>
  );
}
