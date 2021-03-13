import React, { useState, KeyboardEvent } from 'react';
import Container from '../../components/container';
import Puzzle from '../../components/puzzle';
import Title from '../../components/title';
import { PuzzleSolutionResponse } from '../../types';

const Landing = () => {
  const [solveabale, setSolveable] = useState<boolean>(false);
  const [inputValid, setInputValid] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<Array<string>>([]);

  const handleSolve = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setInputValid(value.length === 4);

    if (value.length === 4) {
      const payload = { puzzle: Array.from(value).map((i) => parseInt(i, 10)) };
      fetch('/api/solve/puzzle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then((response) => response.json())
        .then((data: PuzzleSolutionResponse) => {
          if (data.hasSolutions) {
            setSolutions(data.solutions);
            setSolveable(true);
          } else {
            setSolutions([]);
            setSolveable(false);
          }
        })
        .catch(() => setSolutions([]));
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
        hasSolutions={solveabale}
        inputValid={inputValid}
        solutions={solutions}
      />
    </Container>
  );
};
export default Landing;
