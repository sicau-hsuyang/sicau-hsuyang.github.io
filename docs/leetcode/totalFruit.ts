export function totalFruit(fruits: number[]): number {
  let categoryArr: number[] = [];
  const categoryPosMap: Map<number, number> = new Map();
  let left = 0;
  let maxDistance = 0;
  let len = fruits.length;
  for (let right = 0; right < len; right++) {
    const type = fruits[right];
    // 两个篮子没有装满，需要增加种类
    if (
      categoryArr.length < 2 ||
      (categoryArr.includes(type) && categoryArr.length === 2)
    ) {
      if (!categoryArr.includes(type)) {
        categoryArr.push(type);
      }
      // 更新当前这个种类水果的最近的位置
      categoryPosMap.set(type, right);
    } else {
      // 当前已经装了2个篮子了，来的新的种类不是其中的类型
      const tempType1 = categoryArr.shift()!;
      const tempType2 = categoryArr.shift()!;
      // 分别取出这两个字符最后出现的位置
      const tempPos1 = categoryPosMap.get(tempType1)!;
      const tempPos2 = categoryPosMap.get(tempType2)!;
      // 获取到这个即将要从窗口离开的内容的位置
      let removeTypeLatestPos: number;
      if (tempPos1 < tempPos2) {
        removeTypeLatestPos = tempPos1;
        // 删除这个类型的位置
        categoryPosMap.delete(tempType1);
        // 留下大的那个
        categoryArr.push(tempType2);
      } else {
        removeTypeLatestPos = tempPos2;
        // 删除这个类型的位置
        categoryPosMap.delete(tempType2);
        // 留下大的那个
        categoryArr.push(tempType1);
      }
      // 因为当前这个还不参与计算，所以本来应该是right-left+1的变成right-left
      const distance = right - left;
      if (distance > maxDistance) {
        // console.log(fruits.slice(left, right));
        maxDistance = distance;
      }
      // 6, 5, 6, 6
      // 将其迁移到只含一个种类的位置
      left = removeTypeLatestPos + 1;
      // 把当前的也要加到窗口里面去，不能以往
      categoryArr.push(type);
      categoryPosMap.set(type, right);
    }
  }
  // 尝试算一下最后的长度
  const distance = len - left;
  if (distance > maxDistance) {
    // console.log(fruits.slice(left));
    maxDistance = distance;
  }
  return maxDistance;
}
