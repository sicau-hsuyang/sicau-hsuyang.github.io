### 什么是 **Event Loop（事件循环）**？

**Event Loop** 是 JavaScript 的一种机制，用来处理异步任务和回调。因为 JavaScript 是单线程的，它不能同时处理多个任务，而是通过**事件循环**来管理并执行任务队列中的任务。

### 浏览器与 Node.js 中 **Event Loop** 的差异

JavaScript 的 **Event Loop** 在不同的环境下有不同的实现，最常见的就是浏览器和 Node.js 环境。它们的核心思想类似，但由于运行时环境和任务的优先级不同，它们的事件循环机制也有差异。

### **Event Loop** 的核心概念

要理解 **Event Loop**，我们需要先了解几个概念：

1. **Call Stack（调用栈）**：同步任务在这里按顺序执行。每当一个任务完成，都会从栈中移除。当栈为空时，**Event Loop** 才能去处理异步任务。

2. **Task Queue（任务队列）**：异步任务的回调函数会进入任务队列，等待调用栈为空时由 **Event Loop** 取出并执行。

3. **Microtask Queue（微任务队列）**：微任务的优先级比宏任务高。通常 `Promise` 的回调会进入微任务队列。

4. **Macro-task Queue（宏任务队列）**：宏任务队列包含的任务优先级较低，比如 `setTimeout`、`setInterval` 的回调，或者一些 I/O 操作。

5. **Event Loop**：通过循环检查调用栈和任务队列，负责管理并执行同步和异步任务。

### **Event Loop** 工作流程

1. **执行 Call Stack** 中的同步任务，直到栈为空。
2. **微任务队列**中的任务会优先被执行，直到微任务队列清空。
3. **宏任务队列**中的任务在微任务完成后会被处理。每当一个宏任务执行完后，立即检查并处理微任务队列。

### 浏览器中的 **Event Loop**

在浏览器环境中，**Event Loop** 的运作流程是按照 **HTML5 规范**来执行的。流程如下：

1. **Call Stack**：浏览器首先执行所有同步任务，任务一旦完成就从栈中移除。
2. **任务队列**：

   - **宏任务队列**：`setTimeout`、`setInterval`、`MessageChannel`、`requestAnimationFrame`、`I/O` 等异步操作的回调会被放入这个队列。
   - **微任务队列**：`Promise.then`、`MutationObserver` 之类的微任务会被放入这个队列。

3. **事件循环的执行顺序**：
   - 首先执行 **Call Stack** 中的所有同步任务。
   - 当栈为空时，**Event Loop** 检查并执行 **Microtask Queue（微任务队列）** 中的任务，直到微任务队列为空。
   - 当所有微任务都执行完毕后，**Event Loop** 执行 **Macro-task Queue（宏任务队列）** 中的第一个任务，然后再次进入微任务队列的检查。

**浏览器中的优先级**：浏览器会优先处理微任务，然后再去处理宏任务。每个宏任务执行完毕后，都会再次检查微任务队列。

#### 浏览器 Event Loop 的具体示例：

```javascript
console.log("1. Script start");

setTimeout(function () {
  console.log("5. Timeout task");
}, 0);

Promise.resolve().then(function () {
  console.log("3. Microtask");
});

console.log("2. Script end");
```

**输出顺序**：

1. `1. Script start`（同步任务，立即执行）
2. `2. Script end`（同步任务，立即执行）
3. `3. Microtask`（微任务，在同步任务后立即执行）
4. `5. Timeout task`（宏任务，在微任务执行完后再执行）

### Node.js 中的 **Event Loop**

在 Node.js 中，**Event Loop** 与浏览器的不同点主要体现在**任务优先级**和 Node.js 内部的任务类型。Node.js 的 **Event Loop** 基于 **libuv** 实现，包含多个阶段，每个阶段处理特定类型的异步操作。Node.js 中的 **Event Loop** 有 6 个阶段：

1. **timers** 阶段：执行 `setTimeout` 和 `setInterval` 的回调。
2. **I/O callbacks** 阶段：执行一些系统调用的回调，比如网络、文件 I/O 的回调。
3. **idle, prepare** 阶段：内部使用，一般不涉及应用程序的回调。
4. **poll** 阶段：轮询新的 I/O 事件，处理异步操作的回调。
5. **check** 阶段：执行 `setImmediate` 的回调。
6. **close callbacks** 阶段：执行 `close` 事件的回调，比如 `socket.on('close')`。

Node.js 中也有**微任务队列**，它的优先级与浏览器类似，即微任务会在各个阶段的任务执行完后立即执行。Node.js 中的微任务主要是通过 `process.nextTick()` 和 `Promise` 实现的。

#### Node.js 中的阶段：

- 在每个阶段完成后，Node.js 都会检查是否有微任务要执行。微任务队列清空后才会进入下一个阶段。
- **微任务优先级**：无论在哪个阶段，**微任务都会优先于下一个阶段的任务执行**。这和浏览器类似。

#### Node.js Event Loop 的具体示例：

```javascript
console.log("1. Script start");

setTimeout(function () {
  console.log("5. Timeout task");
}, 0);

setImmediate(function () {
  console.log("6. Immediate task");
});

Promise.resolve().then(function () {
  console.log("3. Microtask");
});

process.nextTick(function () {
  console.log("2. NextTick task");
});

console.log("4. Script end");
```

**输出顺序**：

1. `1. Script start`（同步任务，立即执行）
2. `4. Script end`（同步任务，立即执行）
3. `2. NextTick task`（微任务，在同步任务后立即执行，优先于其他微任务）
4. `3. Microtask`（微任务，紧接着 `nextTick` 执行）
5. `5. Timeout task`（宏任务，`setTimeout`，在微任务执行后执行）
6. `6. Immediate task`（`setImmediate` 的回调）

### 浏览器与 Node.js 中 **Event Loop** 的主要区别：

1. **宏任务与微任务的优先级**：

   - 在浏览器中，每个宏任务执行后，都会先处理完所有的微任务，然后才会继续执行下一个宏任务。
   - 在 Node.js 中，每个阶段执行完后都会检查微任务队列并优先执行微任务，之后才会进入下一个阶段。

2. **Node.js 的 Event Loop 阶段**：
   - Node.js 的事件循环有多个阶段，主要处理 I/O、定时器、`setImmediate` 和关闭事件等不同类型的任务。而浏览器的事件循环结构较为简单，主要分为宏任务和微任务。
   - **`setImmediate` 和 `setTimeout` 的优先级**：在浏览器中，`setTimeout(fn, 0)` 通常会在 `setImmediate` 之前执行，而在 Node.js 中，`setImmediate` 优先于 `setTimeout(fn, 0)`。

### 总结

- **Event Loop** 负责在调用栈和任务队列之间进行调度，保证同步任务先执行，异步任务后执行。
- **浏览器** 和 **Node.js** 都遵循 Event Loop 的基本原则，但它们在任务的处理顺序上有些区别。浏览器中的 **Event Loop** 更注重页面的渲染和用户交互，因此处理微任务的时机和方式有所不同。而 Node.js 的 **Event Loop** 则更复杂，包含多个阶段，专注于 I/O 任务和服务器端处理。
