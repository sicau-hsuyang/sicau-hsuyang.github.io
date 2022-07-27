// /**
//  * 构建文件树
//  * @param file 文件信息
//  * @param file 文件列表信息
//  */
// function buildTree(file, files) {
//   let children = files.filter((fileEle) => {
//     return fileEle.pid === file.id;
//   });
//   file.children = children.map((subFile) => buildTree(subFile, files));
//   return file;
// }

// /**
//  * 将文件列表转为文件树，并且返回根节点
//  * @param files 文件列表
//  */
// function build(files) {
//   // 构建结果
//   const roots = files
//     .filter((file) => {
//       return file.pid === null;
//     })
//     .map((file) => {
//       return buildTree(file, files);
//     });
//   return roots;
// }

let data = [
  {
    pid: null,
    id: 1,
  },
  {
    pid: null,
    id: 2,
  },
  {
    pid: 1,
    id: 3,
  },
  {
    pid: 3,
    id: 4,
  },
  {
    pid: 3,
    id: 5,
  },
  {
    pid: 5,
    id: 6,
  },
];

// let res = build(data);

// console.log(res);

/**
 * 将文件列表转换成为哈希表
 * @param {File[]} files
 */
function makeHashMap(files) {
  const map = new Map();
  files.forEach((file) => {
    map.set(file.id, file);
  });
  return map;
}

function buildTree(files) {
  // 将文件构建成哈希表，主要是为了后序的查找方便
  const fileMap = makeHashMap(files);
  const roots = [];
  // 逐个的对每个文件增加子元素
  files.forEach((file) => {
    // 找父级文件，如果找不到的话，说明是根节点
    const parentFile = fileMap.get(file.pid);
    if (parentFile) {
      if (!Array.isArray(parentFile.children)) {
        parentFile.children = [file];
      } else {
        parentFile.children.push(file);
      }
    } else {
      roots.push(file);
    }
  });
  // 最后只需要找出根节点的文件列表即可完成构建
  return roots;
}

let res = buildTree(data);

console.log(res);
