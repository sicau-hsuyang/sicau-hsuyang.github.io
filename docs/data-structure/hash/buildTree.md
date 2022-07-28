## 构建树

这是一个在实际开发中相当常见的一个需求了。

有些时候，是因为后端直接返回树结构的话，序列化时`i/o`开销比较大，在高并发场景下，会使得服务器的效率降低，因此不得不让前端自行构建树型结构的数据。

还有一种情况就比较搞笑了，这种情况一般出现在小公司，你的后端因为某些不可告人的秘密，告诉你只能给你返回数组。但是我们前端又必须需要一个树状结构。此时为了避免尴尬，前端可能会要求后端怎么样操作简单就怎么样约定数据格式了，然后前端按照相应的规格自己将其构建成树。

一般，后端给到前端的数据是这样的，我就以文件列表的例子来举例。

```ts
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
   * 子文件列表
   */
  children?: File[];
}
```

### 递归法

```ts
/**
 * 构建文件树
 * @param file 文件信息
 * @param file 文件列表信息
 */
function buildTree(file: File, files: File[]) {
  // 找到当前文件的子文件列表
  let children = files.filter((fileEle: File) => {
    return fileEle.pid === file.id;
  });
  // 递归的处理当前文件子文件列表的子文件
  file.children =
    children.length === 0
      ? undefined
      : children.map((subFile: File) => buildTree(subFile, files));
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
      // 这一步操作是为了找到所有的根节点
      return file.pid === null;
    })
    .map((file) => {
      // 对根节点的数据进行构建
      return buildTree(file, files);
    });
  return roots;
}
```

递归法的时间复杂度为`O(n)`，并且还有一个额外的`O(h)`的空间复杂度（递归调用时的堆栈空间占用），而且这个是有一定的风险的，当数据量比较大的时候，JS 可能会出最大调用栈的报错。

### 哈希法

这个方案是有点儿取巧的一种做法了，因为其完美的利用了引用类型数据的特征，因为引用数据类型，大家都同时持有一块相同的内存区域，不同的人对它进行修改，都会在它的身上得到体现。

这是我曾经偶然一次自己写代码时发现的，后来在论坛上发现了大佬们也是这样做的，心里面还稍稍的窃喜了一下。

```js
/**
 * 将文件列表转换成为哈希表
 * @param {File[]} files
 */
function makeHashMap(files) {
  const map = new WeakMap();
  files.forEach((file) => {
    // 以ID为主键建立哈希映射
    map.set(file.id, file);
  });
  return map;
}

function buildTree(files) {
  // 将文件构建成哈希表，主要是为了后续的查找方便
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
```

哈希法，将文件列表建立哈希，时间复杂度为`O(N)`，空间复杂度是`O(N)`，在构建时一次遍历，时间复杂度为`O(N)`，申明了一个用于存根节点存储的数组，最坏情况下，全部都是根节点，空间复杂度是`O(N)`，因此，哈希法的时间复杂度为`O(N)`，空间复杂度是`O(N)`，完爆递归法，而且代码也简洁易懂，不用担心在数据量较大的时候爆栈的风险。
