/**
 * 文件信息
 */
interface File {
  /**
   * 文件的ID，需要使用string类型，若使用number类型，当id特别大的时候，前端解析的结果将不正确
   */
  id: string;

  /**
   * 文件的父级ID, 可能不存在
   */
  pid: string | null;

  /**
   * 文件名
   */
  filename: string;

  /**
   * 文件类型，比如是文件还是文件夹
   */
  type: number;
}

/**
 * 将文件列表转为哈希表
 */
function makeHashMap(files: File[]) {
  const map = new Map<string, File>();
  files.forEach((file) => {
    map.set(file.id, file);
  });
  return map;
}

/**
 * 构建文件树
 * @param file 文件信息
 * @param map 文件哈希表
 */
function buildTree(file, map) {
  const parentFile = map.get(file.id);
  if (!parentFile) {
    return file;
  }
  
}

/**
 * 将文件列表转为文件树，并且返回根节点
 * @param files 文件列表
 */
function build(files) {
  // 将文件列表转为哈希表，便于后面在构建的时候直接查找，以空间换时间
  const map = makeHashMap(files);
  // 构建结果
  const roots = files.map((file) => {
    return buildTree(file, map);
  });
  return roots;
}
