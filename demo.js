// function demo() {
//   var obj = {
//     a: 1,
//     b: 2,
//   };

//   return function test() {
//     var b = obj;
//     setTimeout(() => {
//       b = null;
//       obj = null;
//     }, 1000);
//   };
// }

// const fn = demo();

// fn();
const path = require("path");
const fs = require("fs");

function readFileContent(filePath) {
  try {
    // 同步读取文件内容
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return fileContent;
  } catch (error) {
    console.error("读取文件失败:", error);
    return null;
  }
}

const filePath22 = path.resolve(__dirname, "./result.text");

const data = readFileContent(filePath22);

const jsonData = JSON.parse(data);



function writeJsonToFile(jsonData, filePath) {
  // 将 JSON 数据转换为字符串
  const jsonString = jsonData

  // 将 JSON 字符串写入文件
  fs.writeFileSync(filePath, jsonString);

  console.log("JSON 内容已成功写入文件");
}

const filePath = path.resolve(__dirname, "./response.json");

writeJsonToFile(jsonData, filePath);
