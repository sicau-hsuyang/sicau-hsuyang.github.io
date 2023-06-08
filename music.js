const path = require("path");
const ID3 = require("node-id3");
const fs = require("fs");

// 要读取的文件夹路径
const myFolederPath = path.resolve(__dirname, "wusi/524");
let counter = 0;
// 递归遍历文件夹并重命名MP3文件
function renameMP3Files(folderPath) {
  // 读取文件夹中的文件列表
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("无法读取文件夹:", err);
      return;
    }

    // 遍历文件列表
    files.forEach((file, index) => {
      const filePath = path.join(folderPath, file); // 文件路径

      // 检查文件是否为目录（文件夹）
      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.error(`无法获取文件状态 ${filePath}:`, error);
          return;
        }

        if (stats.isDirectory()) {
          // 递归遍历子文件夹
          renameMP3Files(filePath);
        } else if (path.extname(file).toLowerCase() === ".mp3") {
          const curFileName = path.join(folderPath, file);
          const tags = ID3.read(curFileName);
          const isExist = tags.title && tags.artist;
          const prefix = curFileName.split("/");
          const realFilename = prefix.pop();
          const temp = isExist ? "" : realFilename.replace(/\.mp3/, "--");
          const newFileName = `${prefix.join("/") + "/" + temp}${
            tags.title || "未知"
          }--${tags.artist || "未知"}.mp3`; // 新文件名
          const newFilePath = newFileName; // 新文件路径
          // 重命名文件
          fs.rename(filePath, newFilePath, (renameError) => {
            if (renameError) {
              console.log(counter++);
              // console.error(`无法重命名文件 ${file}:`);
            } else {
              console.log(`已重命名文件 ${file} 为 ${newFileName}`);
            }
          });
        }
      });
    });
  });
}

renameMP3Files(myFolederPath);
