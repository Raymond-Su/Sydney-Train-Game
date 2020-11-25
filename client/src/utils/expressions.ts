export const makePostFixExpr = (numList: number[], opList: string[]) => {
  let expr = [String(numList[0])];
  let rest = numList.slice(1);
  rest.forEach((r, i) => {
    expr = expr.concat([String(r), opList[i]]);
  });
  return expr;
};

export const isBalancedParenthesis = (str: string) => {
  return !Array.from(str).reduce((uptoPrevChar, thisChar) => {
    if (thisChar === "(" || thisChar === "{" || thisChar === "[") {
      return ++uptoPrevChar;
    } else if (thisChar === ")" || thisChar === "}" || thisChar === "]") {
      return --uptoPrevChar;
    }

    return uptoPrevChar;
  }, 0);
};

export const getOperatorPrecedence = (c: string) => {
  if (c === "^") return 3;
  if (c === "*") return 2;
  if (c === "/") return 2;
  if (c === "+") return 1;
  if (c === "-") return 1;
  return 0;
};

interface IntermediateNode {
  operator: string;
  expression: string;
}

export const postFixToInfix = (postfixExpr: string[]) => {
  let stack: IntermediateNode[] = [];

  for (const token of postfixExpr) {
    if (isNaN(parseInt(token, 10))) {
      const operatorPrecedence = getOperatorPrecedence(token);
      // Get the left and right operands from the stack.
      let rightIntermediate = stack.pop() as IntermediateNode;
      let leftIntermediate = stack.pop() as IntermediateNode;

      if (operatorPrecedence === 1) {
        // Note that since   + and - are lowest precedence operators,
        // we do not have to add any parentheses to the operands.

        // construct the new intermediate expression by combining the left and right
        // expressions using the operator (token).
        let newExpr = leftIntermediate.expression + token + rightIntermediate.expression;
        stack.push({ expression: newExpr, operator: token });
      } else if (operatorPrecedence > 1) {
        let rightExpr = rightIntermediate.expression;
        let leftExpr = leftIntermediate.expression;

        // Get the intermediate expressions from the stack.
        // If an intermediate expression was constructed using a lower precedent
        // operator (+ or -), we must place parentheses around it to ensure
        // the proper order of evaluation.

        if (getOperatorPrecedence(rightIntermediate.operator) === 1) {
          rightExpr = `(${rightIntermediate.expression})`;
        }

        if (getOperatorPrecedence(leftIntermediate.operator) === 1) {
          leftExpr = `(${leftIntermediate.expression})`;
        }

        const newExpr = leftExpr + token + rightExpr;
        stack.push({ expression: newExpr, operator: token });
      }
    } else {
      // Must be a number. Push it on the stack.
      stack.push({ expression: token, operator: "" });
    }
  }
  // There must be a single element in stack now which is the required infix.
  return stack[0].expression;
};

export const infixToPostFix = (infixExpr: string) => {
  let stack: string[] = [];
  let postFixExpr: string = "";

  for (const token of infixExpr) {
    if (isNaN(parseInt(token, 10))) {
      if (stack.length === 0) {
        stack.push(token);
      } else if (token === ")") {
        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          postFixExpr += stack.pop();
        }
        stack.pop();
      } else {
        // If the precedence of the scanned operator is greater than the precedence of the operator
        // in the stack(or the stack is empty or the stack contains a ‘(‘ ), push it.
        if (getOperatorPrecedence(token) === 1) {
          if (getOperatorPrecedence(stack[stack.length - 1]) >= 1) {
            // Pop all the operators from the stack which are greater than or equal to in precedence
            // than that of the scanned operator. After doing that Push the scanned operator to the stack.
            // (If you encounter parenthesis while popping then stop there and push the scanned operator in the stack.)
            while (stack.length > 0 && stack[stack.length - 1] !== "(") {
              postFixExpr += stack.pop();
            }
          }
        }
        // If the scanned character is an ‘(‘, push it to the stack.
        stack.push(token);
      }
    } else {
      // If the scanned character is an operand, output it.
      postFixExpr += token;
    }
  }
  // Pop and output from the stack until it is not empty.
  while (stack.length > 0) {
    postFixExpr += stack.pop();
  }
  return postFixExpr;
};
