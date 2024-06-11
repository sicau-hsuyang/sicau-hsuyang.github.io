import { LUPrefix } from "./LUPrefix";

describe("LUPrefix", () => {
  it("case 1", () => {
    const server = new LUPrefix(3);
    server.upload(3);
    console.log(server.longest()); // 由于视频 1 还没有被上传，最长上传前缀是 0 。
    server.upload(1); // 上传视频 1 。
    console.log(server.longest()); // 前缀 [1] 是最长上传前缀，所以我们返回 1 。
    server.upload(2); // 上传视频 2 。
    console.log(server.longest()); // 前缀 [1,2,3] 是最长上传前缀，所以我们返回 3 。
  });
});
