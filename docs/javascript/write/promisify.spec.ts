import { Abortable } from "events";
import { promisify } from "./promisify";
import * as fs from "fs";
import * as path from "path";

jest.mock("fs");

type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type EjectLast<TArray extends unknown[]> = TArray extends [
  ...infer Other,
  infer Tail
]
  ? Other
  : never;

function mockAsyncApi(input: number | string, callback: Function) {
  callback(null, input);
}

function mockAsyncApi2(input: number, input2: number, callback: Function) {
  callback(null, input, input2);
}

function mockError(callback: Function) {
  callback(new Error("test error"));
}

describe("test promisify", () => {
  it("test single argument", () => {
    const mockApi = promisify(mockAsyncApi) as (
      ...args: EjectLast<Parameters<typeof mockAsyncApi>>
    ) => Promise<string | number>;
    mockApi("hello world").then((resp) => {
      expect(resp).toEqual("hello world");
    });
  });

  it("test multi argument", () => {
    const mockApi = promisify(mockAsyncApi2) as (
      ...args: EjectLast<Parameters<typeof mockAsyncApi2>>
    ) => Promise<number[]>;
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
