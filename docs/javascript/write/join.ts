function join(arr1: any[], arr2: any[]): any[] {
  const merged: any[] = [];
  let offset1 = 0;
  let offset2 = 0;
  while (offset1 < arr1.length && offset2 < arr2.length) {
    const target1 = arr1[offset1];
    const target2 = arr2[offset2];
    if (target1.id === target2.id) {
      merged.push({
        ...target1,
        ...target2,
      });
      offset1++;
      offset2++;
    } else {
      if (target1.id > target2.id) {
        merged.push(target2);
        offset2++;
      } else if (target2.id > target1.id) {
        merged.push(target1);
        offset1++;
      }
    }
  }

  while (offset1 < arr1.length) {
    const target1 = arr1[offset1];
    merged.push(target1);
    offset1++;
  }

  while (offset2 < arr2.length) {
    const target2 = arr2[offset2];
    merged.push(target2);
    offset2++;
  }

  return merged;
}
