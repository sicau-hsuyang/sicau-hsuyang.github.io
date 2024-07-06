function toSet(val: string | Set<string>) {
  const set: Set<string> = new Set();
  if (val instanceof Set) {
    val.forEach((v) => {
      set.add(v);
    });
  } else if (typeof val === "string") {
    set.add(val);
  }
  return set;
}

export function braceExpansionII(expression: string): string[] {
  const stack: Array<Set<string> | string> = [];
  let offset = 0;
  let tempRecord;
  let current = "";
  while (offset < expression.length) {
    const char = expression[offset];
    if (/[a-z]/i.test(char)) {
      current += char;
    } else if (current !== "") {
      let move = offset - 1;
      while (move >= 0 && /[a-z]/i.test(expression[move])) {
        move--;
      }
      if (move >= 0 && expression[move] === "}") {
        let nextTemp = stack.pop();
        if (tempRecord === undefined) {
          tempRecord = nextTemp;
        } else {
        }
      }
      stack.push(current);
      current = "";
    }

    if (char === "}") {
      const set: Set<string> = new Set();
      while (stack.length && stack[stack.length - 1] !== "{") {
        const val = stack.pop()!;
        if (val instanceof Set) {
          val.forEach((sub) => {
            set.add(sub);
          });
        } else {
          set.add(val);
        }
      }
      // 丢弃 {
      stack.pop();
      if (tempRecord) {
        const nextSet: Set<string> = new Set();
        const tempSet = toSet(tempRecord);
        tempSet.forEach((tp) => {
          set.forEach((prop) => {
            nextSet.add(tp + prop);
          });
        });
        stack.push(nextSet);
      } else {
        stack.push(set);
      }
      tempRecord = undefined;
    } else if (char === "{") {
      if (
        offset !== 0 &&
        (expression[offset - 1] === "}" ||
          /[a-z]/i.test(expression[offset - 1]))
      ) {
        tempRecord = stack.pop();
      }
      stack.push("{");
    }
    offset++;
  }
  const distSet: Set<string> = new Set();
  for (let i = 0; i < stack.length; i++) {
    const chunk = stack[i];
    if (typeof chunk === "string") {
      distSet.add(chunk);
    } else {
      chunk.forEach((str) => {
        distSet.add(str);
      });
    }
  }
  return [...distSet];
}
