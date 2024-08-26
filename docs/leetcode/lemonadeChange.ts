export function lemonadeChange(bills: number[]): boolean {
  // 表示当前我手里面的钱
  const myMoney = [0, 0, 0];
  for (let i = 0; i < bills.length; i++) {
    if (bills[i] === 20) {
      // 够找零的话，优先消耗10元的
      if (myMoney[0] >= 1 && myMoney[1] >= 1) {
        myMoney[0]--;
        myMoney[1]--;
        myMoney[2]++;
      }
      // 不够的情况再考虑消耗5元的
      else if (myMoney[0] >= 3 && myMoney[1] === 0) {
        myMoney[0] -= 3;
        myMoney[2]++;
      } else {
        return false;
      }
    } else if (bills[i] === 10) {
      if (myMoney[0] >= 1) {
        myMoney[0]--;
        myMoney[1]++;
      } else {
        return false;
      }
    } else {
      myMoney[0]++;
    }
  }
  return true;
}
