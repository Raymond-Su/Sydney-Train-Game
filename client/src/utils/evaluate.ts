export const evaluateRPNExpression = (expr: string[]): number => {
  const stack: string[] = [];
  for (const tok of expr) {
    const token = parseInt(tok, 10);

    if (isNaN(token)) {
      // is operator
      const operator = tok;
      // e.g. expr = [4, 2, -]
      //     stack = [4] -> [4, 2] -> [4, 2, -]
      //     popped: -, then 2 ('first') and then 4 ('second')
      //     e.g. stack.push(second-first) = stack.push(4-2);
      const first = Number(stack.pop()); // would pop 2 ('first')
      const second = Number(stack.pop()); // would pop 4 ('second')
      switch (operator) {
        case '+':
          stack.push(String(second + first));
          break;
        case '-':
          stack.push(String(second - first));
          break;
        case '*':
          stack.push(String(second * first));
          break;
        case '/':
          stack.push(String(second / first));
          break;
        case '^':
          stack.push(String(Math.pow(second, first)));
          break;
        default:
          console.log('A problem has occurred.');
      }
    } else {
      // is number
      stack.push(String(token));
    }
  }
  return Number(stack[0]);
};
