interface Struct {
  acc: number;
  str: string;
}

function find(num: string, offset: number, target: number): Struct[] {
  if (offset === num.length - 1) {
    return [
      {
        acc: Number.parseInt(num[offset]),
        str: num[offset],
      },
    ];
  }
  const res: Struct[] = [];
  if (num[offset] === "0") {
    const plan1 = find(num, offset + 1, target);
    plan1.forEach(({ str, acc }) => {
      if (acc === target) {
        res.push({
          acc,
          str: "0+" + str,
        });
      }
    });
    const plan2 = find(num, offset + 1, target);
    plan2.forEach(({ str, acc }) => {
      if (acc === target) {
        res.push({
          acc,
          str: "0-" + str,
        });
      }
    });
    const plan3 = find(num, offset + 1, target);
    plan3.forEach(({ str, acc }) => {
      if (target === 0) {
        res.push({
          acc: 0,
          str: "0*" + str,
        });
      }
    });
  } else {
    for (let end = offset + 1; end < num.length; end++) {
      const curNumStr = num.substring(offset, end);
      const curNum = Number.parseInt(curNumStr);
      const plan1 = find(num, end, target);
      plan1.forEach(({ str, acc }) => {
        if (acc + curNum === target) {
          res.push({
            acc: curNum + acc,
            str: curNumStr + "+" + str,
          });
        } else if (curNum - acc === target) {
          res.push({
            acc: curNum - acc,
            str: curNumStr + "-" + str,
          });
        } else if (acc * curNum === target) {
          res.push({
            acc: acc * curNum,
            str: curNumStr + "*" + str,
          });
        }
      });
    }
  }
  return res;
}

export function addOperators(num: string, target: number): string[] {
  const res = find(num, 0, target);
  console.log(res);
  return [];
}
