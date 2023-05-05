## 实现两个大数相加

`JS`中数据的最大有效值是`Number.MAX_SAFE_INTEGER`，合（`2**53-1`），`JavaScript`采用的浮点数表示方式——`IEEE 754`标准中的双精度浮点数，在`IEEE 754`标准中，`64`位双精度浮点数中有`1`位符号位、`11`位指数位和`52`位尾数位，其中尾数位的最高位是隐含的，总共可以表示的数值范围为`±(1-2^-52) x 2^1023`，如果超过了这个值，再将其进行运算可能不符合预期了。

所以实际开发中，服务端在返回`ID`这种主键数据时应该避免用`Number`类型。

大数加法在面试中也是一个经常出现的编程题，想进大厂的同学一定要掌握它。

如果我们要想对大数进行运算，那就只能按照小学老师教过我们的办法了，只不过是用计算机代码描述了一遍。

本文不考虑科学计数法和小数的场景。

小时候，我们上数学课的时候，老师教我们列竖式，大数相加也可以采取这种方法。首先我们将待求和的两个数字拆分成数组，并且从右算到左，每次加和的时候，需要判断是否大于十，大于则需要进位，并且，还需要判断当前是否有上一次的进位标记，如果有的话，还需要多加 1，把这个过程执行到所有的数字处理完，则完成加和。

为了降低编码的错误，计算过程中就不补`0`了（有些同学可能会相当将两个数对齐，但是这个的处理过程多，我觉得容易出错），我们利用归并排序的思路实现。

以下是上述思路的代码实现：

```ts
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
  // 以下两个while只会执行一个，处理逻辑也是一致
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
```

以下是这个函数的单元测试：

```ts
import { add } from "./add";
describe("add function", () => {
  test("adds two strings of digits correctly", () => {
    expect(add("123", "456")).toBe("579");
    expect(add("999", "1")).toBe("1000");
    expect(add("888", "12")).toBe("900");
    expect(add("1234", "56789")).toBe("58023");
  });

  test("returns '0' if both arguments are '0'", () => {
    expect(add("0", "0")).toBe("0");
  });

  test("1 + 99999999", () => {
    expect(add("1", "99999999")).toBe("100000000");
  });
});
```

在力扣上，有两道类似的题，一道题是链表的逆序存储两个数的各位数字，一道是链表的顺序存储两个数的各位数字，其思路一致，有兴趣的同学可以尝试一下。
