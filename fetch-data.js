const { execSync } = require("child_process");
const fs = require("fs");
(async () => {
  function fetchRemote(idx) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // 执行 curl 命令
          const result =
            execSync(`curl 'https://www.cadz.org.cn/index.php/Develop/kfq_ajax_data.html' \
      -H 'Accept: application/json, text/javascript, */*; q=0.01' \
      -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,nl;q=0.5,fr;q=0.4' \
      -H 'Connection: keep-alive' \
      -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
      -H 'Cookie: HWWAFSESID=3ce127381ae91a9afe; HWWAFSESTIME=1684899242604; PHPSESSID=06h7tt9r6m1l4d75pufc81b8i6' \
      -H 'Origin: https://www.cadz.org.cn' \
      -H 'Referer: https://www.cadz.org.cn/index.php/Develop/index.html' \
      -H 'Sec-Fetch-Dest: empty' \
      -H 'Sec-Fetch-Mode: cors' \
      -H 'Sec-Fetch-Site: same-origin' \
      -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50' \
      -H 'X-Requested-With: XMLHttpRequest' \
      -H 'sec-ch-ua: "Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"' \
      -H 'sec-ch-ua-mobile: ?0' \
      -H 'sec-ch-ua-platform: "macOS"' \
      --data-raw 'kfq_p=${idx}&kfq_diqu=0&kfq_shengfen=0&kfq_lv=0&kfq_type=0&kfq_chanye%5B%5D=162&kfq_type=0&kfq_chanye%5B%5D=162' \
      --compressed`);
          const response = result.toString(); // 输出 curl 命令的结果
          const json = JSON.parse(response);
          resolve(json);
          console.log("成功处理到第" + idx + "条数据");
        } catch (error) {
          console.error(error); // 打印错误信息
          reject(error);
        }
      }, 2000 * Math.random().toFixed(0));
    });
  }

  async function bootstrap() {
    const data = {};
    // 100
    for (let i = 1; i <= 212; i++) {
      const json = await fetchRemote(i);
      data[i] = json.data;
    }
    fs.writeFile("data1.json", JSON.stringify(data), (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("JSON file written successfully.");
      }
    });
  }

  await bootstrap();

  const data1 = require("./data.json");

  const allData = Object.values(data1).reduce((total, cur) => {
    return total.concat(cur);
  }, []);

  const ExcelJS = require("exceljs");

  async function createExcel(data, filePath) {
    // 创建一个新的工作簿
    const workbook = new ExcelJS.Workbook();

    // 添加一个工作表
    const sheet = workbook.addWorksheet("中国开发区数据");

    // 添加表头
    const header = Object.keys(data[0]);
    sheet.addRow(header);

    // 添加数据行
    data.forEach((row) => {
      const rowData = Object.values(row);
      sheet.addRow(rowData);
    });

    // 保存工作簿为 Excel 文件
    await workbook.xlsx.writeFile(filePath);
  }

  // 调用函数创建 Excel 文件
  createExcel(allData, "开发区数据.xlsx")
    .then(() => console.log("Excel created successfully."))
    .catch((error) => console.error("Error creating Excel:", error));
})();
