import { Queue } from "./queue";
describe("Queue", () => {
  it("should enqueue elements and dequeue them in the right order", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.size).toBe(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.size).toBe(2);
    expect(queue.dequeue()).toBe(2);
    expect(queue.size).toBe(1);
    expect(queue.dequeue()).toBe(3);
    expect(queue.size).toBe(0);
    expect(queue.isEmpty()).toBe(true);
  });

  it("should throw an error if dequeueing from an empty queue", () => {
    const queue = new Queue<number>();
    expect(queue.isEmpty()).toBe(true);
    expect(() => queue.dequeue()).toThrowError(
      "can not dequeue from an empty queue"
    );
  });
});
