export const evaluatePostFix = (expr: string[]): number => {
  let stack: string[] = [];
  for (const tok of expr) {
    let token = parseInt(tok, 10);

    if (isNaN(token)) {
      // is operator
      let operator = tok;
      // e.g. expr = [4, 2, -]
      //     stack = [4] -> [4, 2] -> [4, 2, -]
      //     popped: -, then 2 ('first') and then 4 ('second')
      //     e.g. stack.push(second-first) = stack.push(4-2);
      let first = Number(stack.pop()); // would pop 2 ('first')
      let second = Number(stack.pop()); // would pop 4 ('second')
      switch (operator) {
        case "+":
          stack.push(String(second + first));
          break;
        case "-":
          stack.push(String(second - first));
          break;
        case "*":
          stack.push(String(second * first));
          break;
        case "/":
          stack.push(String(second / first));
          break;
        case "^":
          stack.push(String(Math.pow(second, first)));
          break;
        default:
          console.log("A problem has occurred.");
      }
    } else {
      // is number
      stack.push(String(token));
    }
  }
  return Number(stack[0]);
};
