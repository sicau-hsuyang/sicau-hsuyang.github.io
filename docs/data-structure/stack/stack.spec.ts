import { Stack } from "./stack";
describe("Stack", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  describe("push", () => {
    it("should add element to stack", () => {
      stack.push(1);
      expect(stack.size).toBe(1);
      expect(stack.top).toBe(1);
      stack.push(2);
      expect(stack.size).toBe(2);
      expect(stack.top).toBe(2);
    });
  });

  describe("pop", () => {
    it("should remove top element from stack", () => {
      stack.push(1);
      stack.push(2);
      expect(stack.pop()).toBe(2);
      expect(stack.size).toBe(1);
      expect(stack.top).toBe(1);
      expect(stack.pop()).toBe(1);
      expect(stack.size).toBe(0);
      expect(stack.top).toBeNull();
    });

    it("should throw an error when popping an empty stack", () => {
      expect(() => stack.pop()).toThrowError("can not pop from an empty stack");
    });
  });

  describe("isEmpty", () => {
    it("should return true when stack is empty", () => {
      expect(stack.isEmpty()).toBe(true);
    });

    it("should return false when stack is not empty", () => {
      stack.push(1);
      expect(stack.isEmpty()).toBe(false);
    });
  });

  describe("top", () => {
    it("should return null when stack is empty", () => {
      expect(stack.top).toBeNull();
    });

    it("should return the top element of the stack", () => {
      stack.push(1);
      stack.push(2);
      expect(stack.top).toBe(2);
    });
  });

  describe("size", () => {
    it("should return the size of the stack", () => {
      expect(stack.size).toBe(0);
      stack.push(1);
      expect(stack.size).toBe(1);
      stack.push(2);
      expect(stack.size).toBe(2);
    });
  });
});
