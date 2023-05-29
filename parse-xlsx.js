const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

function excelToJson(excelFilePath) {
  // 读取 Excel 文件
  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // 将 Excel 数据转换为 JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // 返回 JSON 数据
  return JSON.stringify(jsonData);
}

// 示例用法
const excelFilePath = "./百度地图提取坐标信息.xlsx";
const jsonFilePath = path.resolve(__dirname, "./file.json");

const jsonContent = excelToJson(excelFilePath);

// 将 JSON 数据写入文件
fs.writeFileSync(jsonFilePath, jsonContent);

console.log("Excel 转 JSON 完成");
