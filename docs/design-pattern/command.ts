/**
 * 消息通知类
 */
class Receiver {
  notify() {
    console.log("通知消息已传达~~");
  }
}

/**
 * 命令接口
 */
interface Command {
  action: Action;

  exec(): void;
}

/**
 * 业务命令接口
 */
class CopyCommand implements Command {
  constructor(public action: Action) {}

  // #region 非必须，可以根据业务需要决定
  receiver: Receiver;

  setReceiver(r: Receiver) {
    this.receiver = r;
  }
  // #endregion

  exec(): void {
    // 非必须，可以根据业务决定
    this.receiver.notify();
    this.action.work();
  }
}

/**
 * 命令调用者，命令模式核心类
 */
class Invoker {
  protected cmd: Command;

  setCommand(cmd: Command) {
    this.cmd = cmd;
  }

  execCommand() {
    this.cmd.exec();
  }
}

class Action {
  work() {
    console.log("干活儿");
  }
}

const copyAction = new Action();

const copyCmd = new CopyCommand(copyAction);

const invoker = new Invoker();

invoker.setCommand(copyCmd);

invoker.execCommand();

// abstract class Command {
//   abstract exec(): void;
// }

// class CopyCommand extends Command {
//   exec(): void {
//     console.log("执行copy");
//   }
// }

// class Invoker {
//   command: Command;

//   setCommand(cmd: Command) {
//     this.command = cmd;
//   }

//   execCommand() {
//     this.command.exec();
//   }
// }

// abstract class Command {
//   protected preVal: number;
//   abstract exec(prev: number, ...args: number[]): number;
//   abstract cancel(): number;
// }

// class AddCommand extends Command {
//   protected preVal: number = 0;

//   exec(prev: number, ...args: number[]): number {
//     this.preVal = prev;
//     return args.reduce((prev, cur) => {
//       return prev + cur;
//     }, prev);
//   }

//   cancel(): number {
//     return this.preVal;
//   }
// }

// class MultiCommand extends Command {
//   protected preVal: number = 0;

//   exec(prev: number, ...args: number[]): number {
//     return args.reduce((prev, cur) => {
//       return prev - cur;
//     }, prev);
//   }

//   cancel(): number {
//     return this.preVal;
//   }
// }

// class MinusCommand extends Command {
//   prevVal = 0;

//   exec(prev: number, ...args: number[]): number {
//     this.prevVal = prev;
//     return args.reduce((prev, cur) => {
//       return prev * cur;
//     }, prev);
//   }

//   cancel(): number {
//     return this.prevVal;
//   }
// }

// class Calculator {
//   maxLength = 10;

//   historyQueue: Command[] = [];

//   addCmd: Command;

//   minusCmd: Command;

//   multiCmd: Command;

//   setAddCmd(cmd: Command) {
//     this.addCmd = cmd;
//   }

//   sum = 0;

//   done(action: string, ...num: number[]) {
//     switch (action) {
//       case "+":
//         this.add(num);
//         break;
//       case "-":
//         this.minus(num);
//       case "*":
//         this.multi(num);
//         break;
//     }
//   }

//   undone() {
//     const node = this.historyQueue.pop();
//     if (!node) {
//       console.log("没有可以撤销的命令啦~");
//       return;
//     }
//     const cmd = node;
//     this.sum = cmd.cancel();
//   }

//   recordCommand(cmd: Command) {
//     this.historyQueue.push(cmd);
//     if (this.historyQueue.length > this.maxLength) {
//       console.log("超出了最大的记录数，系统将丢弃一些记录");
//       this.historyQueue.shift();
//     }
//   }

//   add(nums: number[]) {
//     this.sum = this.addCmd.exec(this.sum, ...nums);
//     this.recordCommand(this.addCmd);
//   }

//   minus(nums: number[]) {
//     this.sum = this.minusCmd.exec(this.sum, ...nums);
//     this.recordCommand(this.minusCmd);
//   }

//   multi(nums: number[]) {
//     this.sum = this.multiCmd.exec(this.sum, ...nums);
//     this.recordCommand(this.multiCmd);
//   }
// }
