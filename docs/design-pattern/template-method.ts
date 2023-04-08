abstract class ContractTransaction {
  validVolume(num: number) {
    return num % 100 === 0;
  }

  validTransactionTime(time: Date) {
    const am = [9.5 * 3600 * 1000, 11.5 * 3600 * 1000];
    const pm = [13 * 3600 * 1000, 15 * 3600 * 1000];
    const tick =
      (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()) *
        1000 +
      time.getMilliseconds();
    return (tick >= am[0] && tick <= am[1]) || (tick >= pm[0] && tick <= pm[1]);
  }

  abstract validContractRestrict(stockCode: string, assets: number): boolean;

  buy(stockCode: string, volume: number, assets: number): void {
    if (!this.validTransactionTime(new Date("2023/04/07 10:00:00"))) {
      console.log("非交易时间，无法交易");
      return;
    }
    if (!this.validVolume(volume)) {
      console.log("买卖数量必须是100的整数");
      return;
    }
    if (!this.validContractRestrict(stockCode, assets)) {
      console.log("因您的资产限制，无法买卖当前合约");
      return;
    }
    console.log(`您已成功买入合约：${stockCode}，数量：${volume}`);
  }
}

class ShangHaiContractTransaction extends ContractTransaction {
  validContractRestrict(stockCode: string, assets: number): boolean {
    if (!/^(SHSE)?688/i.test(stockCode)) {
      return true;
    }
    return /^(SHSE)?688/i.test(stockCode) && assets >= 500000;
  }
}

class ShenzhenContractTansaction extends ContractTransaction {
  validContractRestrict(stockCode: string, assets: number): boolean {
    if (!/^(SZSE)?30/i.test(stockCode)) {
      return true;
    }
    return /^(SZSE)?30/i.test(stockCode) && assets >= 100000;
  }
}

function getTransactionStrategy(stockCode): ContractTransaction {
  let stg: ContractTransaction;
  if (/^(SHSE)?6/i.test(stockCode)) {
    stg = new ShangHaiContractTransaction();
  } else {
    stg = new ShenzhenContractTansaction();
  }
  return stg;
}

(function bootstrap() {
  const stocks = ["6000036", "688688", "002230", "300059"];
  stocks.forEach((code) => {
    const stg = getTransactionStrategy(code);
    stg.buy(code, 100 * Math.floor(Math.random() * 10), 30000);
  });
  // 您已成功买入合约：6000036，数量：200
  // 因您的资产限制，无法买卖当前合约
  // 您已成功买入合约：002230，数量：800
  // 因您的资产限制，无法买卖当前合约
})();
