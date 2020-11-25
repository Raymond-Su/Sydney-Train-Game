import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";
import { allOperators, findSolutions } from "../utils/findSolutions";
import { verifySolution } from "../utils/verifySolution";

interface userScore {
  name: string;
  score: number;
}

const Home = () => {
  const [userScores, setUserScores] = useState<userScore[]>([]);
  useEffect(() => {
    if (false) {
      fetch("api/scores")
        .then((res) => res.json())
        .then((data) => {
          setUserScores(data.scores);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const numbers = [1, 6, 1, 3];
  console.log(findSolutions(numbers, allOperators, 10, false));
  console.log(verifySolution(numbers, `(1+6)^1+3`, 10));

  return (
    <div className="App">
      <h1>Home</h1>
      <Link to="/List">
        <button>Home</button>
      </Link>
      {userScores.map((scores) => {
        return <p key={uuidv1()}>{scores.name}</p>;
      })}
    </div>
  );
};
export default Home;
