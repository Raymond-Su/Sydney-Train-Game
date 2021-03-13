import { evaluateRPNExpression } from './evaluate';
import { inOrderCombinations, RPNToInfix } from './expressions';
import { product } from './product';

export const basicOperators = ['/', '*', '-', '+'];
export const advancedOperators = ['^'];
export const allOperators = [...advancedOperators, ...basicOperators];

export const findSolutions = (
  puzzle: number[],
  goal: number = 10,
  operators: string[] = allOperators
) => {
  const opCombs = product(operators, puzzle.length - 1);
  const puzzleString = puzzle.map(String);

  // The expressions are to be represented using Reverse Polish Notation
  let RPNExpressions: string[][] = [];
  opCombs.forEach((opList: string[]) => {
    // Consider a valid RPN expression {a1 a2 a3 a4 a5 a6 ... aN}.
    // {a1 a2} should be operands, as there are no unary operations on the stack.
    // {aN} should be an operator, to complete the operation.
    // Hence, we only need to count possible combinations of the middle segment.
    inOrderCombinations(
      puzzleString.slice(2, puzzle.length),
      opList.slice(0, opList.length - 1)
    ).forEach((middleSegment) => {
      // Prepend the two operands and append the operator
      RPNExpressions.push([
        ...puzzleString.slice(0, 2),
        ...middleSegment,
        ...opList[opList.length - 1]
      ]);
    });
  });
  const RPNSolutions: string[][] = RPNExpressions.filter(
    (expr) => evaluateRPNExpression(expr) === goal
  );

  // Convert to infix solution to make it human readable
  const infixSolutions = RPNSolutions.map((solution) => RPNToInfix(solution));
  return [...new Set(infixSolutions)];
};

// Finding whether a solution exists using dynamic programming.
export const isSolveable = (puzzle: number[], target = 10) => {
  const n = Array.from(puzzle).length;

  const subProblems = Array<number[][]>(n);
  for (let i = 0; i < n; i += 1) {
    subProblems[i] = Array(n);
    for (let j = 0; j < n; j += 1) {
      subProblems[i][j] = Array(0);
    }
  }

  for (let width = 1; width < n + 1; width += 1) {
    for (let i = 0; i < n - width + 1; i += 1) {
      const j = i + width - 1;

      if (width === 1) {
        subProblems[i][j].push(puzzle[i]);
      } else {
        for (let k = i; k < j; k += 1) {
          const l1 = subProblems[i][k];
          const l2 = subProblems[k + 1][j];
          const l1l2: number[][] = [];
          l1.forEach((x) => {
            l2.forEach((y) => {
              l1l2.push([x, y]);
            });
          });
          l1l2.forEach((x) => {
            const a = x[0];
            const b = x[1];
            subProblems[i][j].push(a + b);
            subProblems[i][j].push(a - b);
            subProblems[i][j].push(a * b);
            subProblems[i][j].push(Math.pow(a, b));
            if (b !== 0) {
              subProblems[i][j].push(a / b);
            }
          });
          subProblems[i][j] = [...Array.from(new Set(subProblems[i][j]))];
        }
      }
    }
  }
  return Array.from(subProblems[0][n - 1]).includes(target);
};
