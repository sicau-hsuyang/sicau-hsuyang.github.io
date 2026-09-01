interface Struct {
  state: number;
  distance: number;
}

export function maxTurbulenceSize(arr: number[]): number {
  let prevState: Struct = {
    distance: 1,
    state: 0,
  };
  let maxDistance = prevState.distance;
  for (let i = 1; i < arr.length; i++) {
    let num = arr[i];
    // 下降阶段
    if (prevState.state === -1) {
      // 此刻上升
      if (num > arr[i - 1]) {
        prevState = {
          distance: prevState.distance + 1,
          state: 1,
        };
      }
      // 强转下降
      else if (num < arr[i - 1]) {
        prevState = {
          distance: 2,
          state: -1,
        };
      } else {
        prevState = {
          distance: 1,
          state: 0,
        };
      }
    }
    // 上升阶段
    else if (prevState.state === 1) {
      // 此刻下降
      if (num < arr[i - 1]) {
        prevState = {
          distance: prevState.distance + 1,
          state: -1,
        };
      }
      // 强转上升
      else if (num > arr[i - 1]) {
        prevState = {
          distance: 2,
          state: 1,
        };
      } else {
        prevState = {
          distance: 1,
          state: 0,
        };
      }
    } else {
      // 继续平稳
      if (num === arr[i - 1]) {
        prevState = {
          state: 0,
          distance: 1,
        };
      }
      // 变成上升
      else if (num > arr[i - 1]) {
        prevState = {
          state: 1,
          distance: prevState.distance + 1,
        };
      }
      // 变成下降
      else {
        prevState = {
          state: -1,
          distance: prevState.distance + 1,
        };
      }
    }
    maxDistance = Math.max(prevState.distance, maxDistance);
  }
  return maxDistance;
}
