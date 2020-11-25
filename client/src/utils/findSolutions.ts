import { evaluatePostFix } from "./evaluate";
import { makePostFixExpr, postFixToInfix } from "./expressions";
import { permutations } from "./permutations";
import { product } from "./product";

export const basicOperators = ["/", "*", "-", "+"];
export const advancedOperators = ["^"];
export const allOperators = [...advancedOperators, ...basicOperators];

const findPostFixSolutions = (numbers: number[], operators: string[], goal: number, swap: boolean = false) => {
  const numPerms = permutations(numbers);
  const opCombs = product(operators, numbers.length - 1);
  let solutions: string[][] = [];
  if (swap) {
    numPerms.forEach((numList) => {
      opCombs.forEach((opList: string[]) => {
        const expr = makePostFixExpr(numList, opList);
        if (evaluatePostFix(expr) === goal) solutions.push(expr);
      });
    });
  } else {
    opCombs.forEach((opList: string[]) => {
      const expr = makePostFixExpr(numbers, opList);
      if (evaluatePostFix(expr) === goal) solutions.push(expr);
    });
  }
  return solutions;
};

export const findSolutions = (numbers: number[], operators: string[], goal: number, swap: boolean = false) => {
  const postFixSolutions = findPostFixSolutions(numbers, operators, goal, swap);
  return postFixSolutions.map((solution) => postFixToInfix(solution));
};
