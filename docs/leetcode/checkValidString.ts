function checkEvenValidString(s: string) {
  const stack: string[] = [];
  const anyChars: string[] =[]
  let offset = 0;
  let len = s.length;
  while (offset < len) {
    let char = s[offset++];
    let size = stack.length;
    if (
      [")", "*"].includes(char) &&
      size &&
      ["(", "*"].includes(stack[size - 1])
    ) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}

export function checkValidString(s: string): boolean {
  
}

function genTestCase(len) {
  const indexes = ["*", "(", ")"];
  let res = "";
  for (let i = 0; i < len; i++) {
    res += indexes[Math.floor(Math.random() * 3)];
  }
  return res;
}

/**

(())()(())())())))))


 */
