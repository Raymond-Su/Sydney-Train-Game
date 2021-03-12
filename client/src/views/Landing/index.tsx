import React, { useState, KeyboardEvent } from 'react';
import Container from '../../components/container';
import Puzzle from '../../components/puzzle';
import Title from '../../components/title';
import { findSolutions, isSolveable } from '../../utils/findSolutions';

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
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
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
  const [inputValid, setInputValid] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<Array<string>>([]);

  const handleSolve = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setInputValid(value.length === 4);
    setSolutions([]);
    if (value.length === 4) {
      const puzzle = Array.from(value).map((i) => parseInt(i, 10));
      if (isSolveable(puzzle)) {
        setSolveable(true);
        setSolutions(findSolutions(puzzle));
      } else {
        setSolveable(false);
      }
    }
  };
  return (
    <Container>
      <Title
        title="Sydney Train Game"
        subTitle="Solver to the train/bus/ferry/tram/any 4 digit number game. Must make
          10 by using all 4 numbers in order. Can use any number of parentheses
          and the + - × ÷ operators."
      />
      <Puzzle
        handleSolve={handleSolve}
        validateInput={validateNumber}
        hasSolutions={solveabale}
        inputValid={inputValid}
        solutions={solutions}
      />
    </Container>
  );
};
export default Landing;
