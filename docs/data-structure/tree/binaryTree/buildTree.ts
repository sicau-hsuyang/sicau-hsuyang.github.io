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

  /**
   * 子文件
   */
  children?: File[];
}

/**
 * 构建文件树
 * @param file 文件信息
 * @param file 文件列表信息
 */
function buildTree(file: File, files: File[]) {
  let children = files.filter((file: File) => {
    return (x) => x.pid === file.id;
  });
  file.children =
    children.length === 0
      ? undefined
      : children.map((subFile) => buildTree(subFile, files));
  return file;
}

/**
 * 将文件列表转为文件树，并且返回根节点
 * @param files 文件列表
 */
function build(files: File[]) {
  // 构建结果
  const roots = files
    .filter((file) => {
      return file.pid === null;
    })
    .map((file) => {
      return buildTree(file, files);
    });
  return roots;
}
