export function add(a: string, b: string) {
  let res = "";
  let digitListA = a.split("");
  let digitListB = b.split("");
  // 是否需要进位的标记
  let isAddNext = false;
  // 当两个数字的数位都还没有用完的时候
  while (digitListA.length && digitListB.length) {
    const digitA = digitListA.pop()!;
    const digitB = digitListB.pop()!;
    let accumulate = Number.parseInt(digitA) + Number.parseInt(digitB);
    // 如果需要进位
    if (isAddNext) {
      accumulate += 1;
      // 进位完成之后，把进位标记移除
      isAddNext = false;
    }
    // 如果大于10，标记进位标记，并且将剩余的数字加到当前的结果上
    if (accumulate >= 10) {
      isAddNext = true;
      res = accumulate - 10 + res;
    } else {
      res = accumulate + res;
    }
  }
  // 以下两个while只会执行一次，处理逻辑也是一致
  while (digitListA.length) {
    const digitA = digitListA.pop()!;
    let accumulate = Number.parseInt(digitA);
    if (isAddNext) {
      accumulate += 1;
      isAddNext = false;
    }

    if (accumulate >= 10) {
      isAddNext = true;
      res = accumulate - 10 + res;
    } else {
      res = accumulate + res;
    }
  }

  while (digitListB.length) {
    const digitB = digitListB.pop()!;
    let accumulate = Number.parseInt(digitB);
    if (isAddNext) {
      accumulate += 1;
      isAddNext = false;
    }

    if (accumulate >= 10) {
      isAddNext = true;
      res = accumulate - 10 + res;
    } else {
      res = accumulate + res;
    }
  }

  // 不要忘了最后还有一个判断，比如1+99这种场景
  if (isAddNext) {
    res = "1" + res;
  }
  return res;
}
