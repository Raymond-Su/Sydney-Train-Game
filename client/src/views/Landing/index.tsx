import React, {useState, KeyboardEvent} from 'react';
import {v1 as uuidv1} from 'uuid';
import {findSolutions, isSolveable} from '../../utils/findSolutions';

import './Landing.css';

const validateNumber = (evt: KeyboardEvent<HTMLInputElement>) => {
  const key = evt.key;
  if (
    !evt.shiftKey &&
    !evt.altKey &&
    !evt.ctrlKey &&
    // numbers
    (isFinite(Number(evt.key)) ||
      key === 'Backspace' ||
      key === 'Tav' ||
      key === 'Enter' ||
      key === 'Home' ||
      key === 'End' ||
      key === 'Left' ||
      key === 'Right' ||
      key === 'Delete' ||
      key === 'Insert')
  ) {
    // input is VALID
  } else if (evt.preventDefault) {
    // input is INVALID
    evt.preventDefault();
  }
};

const Landing = () => {
  const [solveabale, setSolveable] = useState<boolean>(false);
  const [validInput, setValidInput] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<Array<string>>([]);
  return (
    <div className="App">
      <div className="train-game-container">
        <h1>Sydney Train Game</h1>
        <p className="subtitle">
          Solver to the train/bus/ferry/tram/any 4 digit number game. Must make
          10 by using all 4 numbers in order. Can use any number of parentheses
          and the + - × ÷ operators.
        </p>
        <form className="puzzle-form" autoComplete="off">
          <input
            autoComplete="off"
            type="text"
            maxLength={4}
            className="puzzle-input"
            placeholder="1234"
            size={4}
            pattern="\d*"
            onKeyDown={validateNumber}
            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
              const {value} = e.target as HTMLInputElement;
              setValidInput(value.length === 4);
              setSolutions([]);
              if (value.length === 4) {
                const puzzle = Array.from(value).map(i => parseInt(i, 10));
                if (isSolveable(puzzle)) {
                  setSolveable(true);
                  setSolutions(findSolutions(puzzle));
                } else {
                  setSolveable(false);
                }
              }
            }}
          />
        </form>
        <div className="content-message">
          {validInput ? (
            solveabale ? (
              <div>
                <h1 className="solveable">Solveable</h1>
                <p>Examples of solutions</p>
                {solutions.map((solution: string) => (
                  <p key={uuidv1()}>{solution}</p>
                ))}
              </div>
            ) : (
              <h1 className="not-solveable">Not Solveable</h1>
            )
          ) : (
            <h1>Enter 4 digits</h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default Landing;
