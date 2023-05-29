const fs = require("fs");
const xlsx = require("xlsx");

function jsonToExcel(jsonData, sheetName, excelFilePath) {
  // 将 JSON 数据转换为工作表
  const worksheet = xlsx.utils.json_to_sheet(jsonData);

  // 创建工作簿
  const workbook = xlsx.utils.book_new();

  // 将工作表添加到工作簿
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

  // 将工作簿写入 Excel 文件
  xlsx.writeFile(workbook, excelFilePath);

  console.log("JSON 转 Excel 完成");
}

// 示例用法
const jsonData = require("./response.json");

const sheetName = "Sheet1";
const excelFilePath = "结果集.xlsx";

jsonToExcel(jsonData, sheetName, excelFilePath);
