import React, { KeyboardEvent } from 'react';
import { v1 as uuidv1 } from 'uuid';
import './puzzle.css';

interface PuzzleProps {
  validateInput: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSolve: (e: KeyboardEvent<HTMLInputElement>) => void;
  hasSolutions: boolean;
  inputValid: boolean;
  solutions: string[];
}

const Puzzle = ({
  validateInput,
  handleSolve,
  hasSolutions,
  inputValid,
  solutions
}: PuzzleProps) => {
  const RenderMessage = () => {
    if (inputValid) {
      if (hasSolutions) {
        return (
          <div>
            <h2 className="solveable">Solveable</h2>
            <p>Number of solutions: {solutions.length}</p>
            {solutions.map((solution: string) => (
              <p key={uuidv1()}>{solution}</p>
            ))}
          </div>
        );
      } else {
        return <h2 className="not-solveable">Not Solveable</h2>;
      }
    }
    return <h2>Enter 4 digits</h2>;
  };

  return (
    <>
      <form className="puzzle-form" autoComplete="off">
        <input
          autoComplete="off"
          type="text"
          maxLength={4}
          className="puzzle-input"
          placeholder="1234"
          size={4}
          pattern="\d*"
          onKeyDown={validateInput}
          onKeyUp={handleSolve}
        />
      </form>
      <div className="content-message">{RenderMessage()}</div>
    </>
  );
};

export default Puzzle;
