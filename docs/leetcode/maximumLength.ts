export function maximumLength(s: string): number {
  const l = s.length;
  // let result = "";
  let maxDistance = -1;
  const update = (char: string, len: number) => {
    if (maxDistance >= len) {
      return;
    }
    maxDistance = len;
    // result = char.repeat(len);
  };
  const map: Map<string, number[]> = new Map();
  let left = 0;
  let char = s[left];
  // const subsets: number[] = [];
  for (let right = 0; right < l; right++) {
    if (s[right] != char) {
      const subsets: number[] = map.get(char) || [];
      if (subsets.length === 0) {
        map.set(char, subsets);
      }
      let distance = right - left;
      subsets.push(distance);
      subsets.sort((a, b) => {
        return b - a;
      });
      if (subsets.length > 3) {
        subsets.pop();
      }
      left = right;
      char = s[left];
    }
  }
  const subsets: number[] = map.get(char) || [];
  if (subsets.length === 0) {
    map.set(char, subsets);
  }
  let distance = l - left;
  subsets.push(distance);
  subsets.sort((a, b) => {
    return b - a;
  });
  if (subsets.length > 3) {
    subsets.pop();
  }
  [...map.values()].forEach((subsets) => {
    // 如果直接找到了3次
    if (subsets.length >= 3) {
      const temp = subsets.slice(0, 3);
      // 最长的字符串里面直接重复3次，仍然比在2里面要大，那么就直接取第一个里面的重复3次
      if (temp[0] - 2 >= temp[1]) {
        update(char, temp[0] - 2);
      }
      // 最长里面重复2次，中间的那个重复一次，仍然比第三个要大，那么就从前面的取2次，第二个取一次
      else if (temp[0] - 1 >= temp[1]) {
        update(char, temp[1]);
      }
      // 最长里面重复2次，中间的那个重复1次
      else if (temp[0] === temp[1] && temp[1] > temp[2]) {
        update(char, temp[0] - 1);
      }
      // 每个都重复1次，直接取前3
      else {
        update(char, temp[2]);
      }
    }
    //  如果只找到了两次，并且不能是1,1这样的结果
    else if (subsets[0] >= 2 && subsets.length === 2) {
      // 在第一个里面直接重复3次
      if (subsets[0] - 2 >= subsets[1]) {
        update(char, subsets[0] - 2);
      }
      // 第一个里面重复2次，第二个里面重复一次，
      else {
        update(char, subsets[0] - 1);
      }
    } else if (subsets.length === 1 && subsets[0] >= 3) {
      update(char, subsets[0] - 2);
    }
  });
  return maxDistance;
}
