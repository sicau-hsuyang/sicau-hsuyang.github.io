import { promisify } from "./promisify";

function mockAsyncApi(input: any, callback: Function) {
  callback(null, input);
}

function mockAsyncApi2(input: any, input2: any, callback: Function) {
  callback(null, input, input2);
}

function mockError(callback: Function) {
  callback(new Error("test error"));
}

describe("test promisify", () => {
  it("test single argument", () => {
    const mockApi = promisify(mockAsyncApi);
    mockApi("hello world").then((resp) => {
      expect(resp).toEqual("hello world");
    });
  });

  it("test multi argument", () => {
    const mockApi = promisify(mockAsyncApi2);
    mockApi(1, 2).then((resp) => {
      expect(resp).toEqual([1, 2]);
    });
  });

  it("test error", () => {
    const mockApi = promisify(mockError);
    mockApi().catch((err) => {
      expect(() => {
        throw err;
      }).toThrow("test error");
    });
  });
});
