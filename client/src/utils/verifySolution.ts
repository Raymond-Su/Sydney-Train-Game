import {VERIFY_SOLUTIONS} from '../constants/solutions';
import {evaluateRPNExpression} from './evaluate';
import {infixToRPN, isBalancedParenthesis} from './expressions';
import {advancedOperators} from './findSolutions';

const validNums = (str: string, numbers: number[]) => {
  // Create a duplicate of our input numbers, so that
  // both lists will be sorted.
  const mnums = numbers.slice();
  mnums.sort();

  // Sort after mapping to numbers, to make comparisons valid.
  return str
    .replace(/[^\d\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .map(n => parseInt(n, 10))
    .sort()
    .every((v, i) => v === mnums[i]);
};

const validEval = (input: string): number => {
  try {
    if (
      Array.from(advancedOperators).some(operator => input.includes(operator))
    ) {
      return evaluateRPNExpression(Array.from(infixToRPN(input)));
    }
    // eslint-disable-next-line no-eval
    return eval(input);
  } catch (e) {
    return -1;
  }
};

export const verifySolution = (
  numbers: number[],
  input: string,
  goal: number
): string => {
  let invalidChars = /[^\d+*/\s-()^]/;

  if (input.trim() === '') return VERIFY_SOLUTIONS.EMPTY_INPUT;
  if (input.match(invalidChars)) return VERIFY_SOLUTIONS.INVALID_CHAR;
  if (!isBalancedParenthesis(input))
    return VERIFY_SOLUTIONS.INVALID_PARENTHESIS;
  if (!validNums(input, numbers)) return VERIFY_SOLUTIONS.INVALD_NUMBERS;

  const calc = validEval(input);
  if (calc === -1) return VERIFY_SOLUTIONS.INVALD_INPUT;
  if (calc !== goal) return VERIFY_SOLUTIONS.INVALD_ANSWER;
  return VERIFY_SOLUTIONS.CORRECT_ANSWER;
};
