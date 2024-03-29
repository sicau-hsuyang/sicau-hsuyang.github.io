class EventEmitter {
  private _map: Map<string, ((...args: any[]) => void)[]> = new Map();

  /**
   * 触发一个事件
   */
  $emit(channel: string, ...args: any[]) {
    const eventSets = this._map.get(channel);
    if (!Array.isArray(eventSets)) {
      return;
    }
    eventSets.forEach((f) => {
      f.apply(this, args);
    });
  }

  /**
   * 单次监听事件
   * @param {String} channel 监听事件的频道
   * @param {Function} handler 监听事件的处理器
   */
  $once(channel: string, handler: (...args: any[]) => void) {
    this.$on(channel, handler, true);
  }

  /**
   * 监听事件
   * @param {String} channel 监听事件的频道
   * @param {Function} handler 监听事件的处理器
   * @param {boolean} once 是否仅监听一次
   */
  $on(channel: string, handler: (...args: any[]) => void, once?: boolean) {
    let eventSets = this._map.get(channel);
    if (!Array.isArray(eventSets)) {
      eventSets = [];
    }
    if (!once) {
      eventSets.push(handler);
    } else {
      const wrapperFunc = function (...args: any[]) {
        handler.apply(this, args);
        this.$off(channel, wrapperFunc);
      };
      eventSets.push(wrapperFunc);
    }
    this._map.set(channel, eventSets);
  }

  /**
   * 移除事件监听
   * @param {String} channel 移除监听事件的频道
   * @param {Function} handler 移除监听事件的处理器
   */
  $off(channel: string, handler: (...args: any[]) => void) {
    const eventSets = this._map.get(channel);
    if (!Array.isArray(eventSets)) {
      console.warn("移除的事件频道不存在");
      return;
    }
    // 如果不传递handler则移除该管道的所有监听
    if (typeof handler !== "function") {
      this._map.delete(channel);
    } else {
      // 否则只删除一个事件监听器
      const delIdx = eventSets.findIndex((f) => f === handler);
      if (delIdx < 0) {
        console.warn("当前尚未设置此handler的监听");
        return;
      } else {
        eventSets.splice(delIdx, 1);
        this._map.set(channel, eventSets);
      }
    }
  }
}

/**
 * 角色枚举
 */
enum Role {
  FE = 1,
  BE = 2,
  UI = 3,
}

/**
 * 中介者
 */
interface IMediator {
  /**
   * 发送事件
   * @param sender 事件的发送方
   * @param channel 频道
   * @param toRole 通知目标的角色
   * @param args 数据参数
   */
  emit(
    sender: ICollege,
    channel: string,
    toRole: Role | null,
    ...args: any[]
  ): void;

  /**
   * 注册可通知的人员
   * @param user
   */
  registry(user: ICollege): void;
}

/**
 * 普通人
 */
abstract class ICollege {
  /**
   * 持有的中介者
   */
  protected mediator: IMediator;
  /**
   * 角色
   */
  public role: Role;
  /**
   * 发送事件
   * @param channel 事件频道
   * @param toRole
   * @param args
   */
  abstract send(channel: string, toRole: Role | null, ...args: any[]): void;
  /**
   * 通知方法，主要供Mediator调用
   * @param sender
   * @param channel
   * @param args
   */
  abstract emit(sender: ICollege, channel: string, ...args: any[]): void;
}

export class ProjectManager implements IMediator {
  private users: Map<Role, ICollege> = new Map();

  emit(sender: ICollege, channel: string, toRole: Role, ...args: any[]): void {
    if (toRole === null) {
      this.users.forEach((u) => {
        if (u != sender) {
          u.emit(sender, channel, ...args);
        }
      });
    } else {
      const targetUser = this.users.get(toRole);
      if (!targetUser) {
        console.warn("can not find user whom you want to contact");
        return;
      }
      targetUser.emit(sender, channel, ...args);
    }
  }

  /**
   * 注册用户
   * @param user
   */
  registry(user: ICollege) {
    this.users.set(user.role, user);
  }
}

class Employee extends ICollege {
  mediator: IMediator;

  protected events = new EventEmitter();

  setMediator(mediator: IMediator) {
    this.mediator = mediator;
    this.mediator.registry(this);
  }

  registryEvent(channel: string, handler: (...args: any[]) => void) {
    this.events.$on(channel, handler);
  }

  send(channel: string, toRole: Role, ...args: any[]): void {
    this.mediator.emit(this, channel, toRole, ...args);
  }

  emit(sender: ICollege, channel: string, ...args: any[]) {
    this.events.$emit(channel, ...[sender, ...args]);
  }
}

export class WebFEDeveloper extends Employee {
  role: Role = Role.FE;

  constructor() {
    super();
    this.registryEvent("UIReady", (sender: ICollege, ...args: any[]) => {
      console.log("UI就绪", args);
      console.log("事件的发送方", sender);
      this.startWork();
    });
    this.registryEvent("BEReady", (sender: ICollege, ...args: any[]) => {
      console.log("后端接口就绪", args);
      console.log("事件的发送方", sender);
      this.finishWork();
    });
    this.registryEvent("done", (sender: ICollege, ...args: any[]) => {
      console.log("前端已知晓开发完成~~~~~~~~~~", args);
      console.log("事件的发送方", sender);
    });
  }

  startWork() {
    console.log("前端开始工作");
    this.connectWork();
  }

  connectWork() {
    this.mediator.emit(
      this,
      "FEReady",
      Role.BE,
      "前端页面已开发完成，可以开始联调"
    );
  }

  async finishWork() {
    console.log("前后端联调完成");
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        this.mediator.emit(
          this,
          "done",
          null,
          "本次活动开发完成，可以提测了，请相关业务方周知"
        );
      }, 500);
    });
  }
}

export class WebBEDeveloper extends Employee {
  role: Role = Role.BE;

  constructor() {
    super();
    this.registryEvent("done", (sender: ICollege, ...args: any[]) => {
      console.log("~~~~~~~~后端已知晓开发完成~~~~~~~");
      console.log("事件的发送方", sender);
      console.log(args);
    });
  }

  startWork() {
    this.mediator.emit(this, "BEReady", Role.FE, "后端接口已完成，请注意查收");
  }
}

export class UIDesigner extends Employee {
  role: Role = Role.UI;

  constructor() {
    super();

    this.registryEvent("done", (sender, ...args) => {
      console.log("~~~~~~UI已知晓开发完成~~~~~");
      console.log("事件的发送方", sender);
      console.log(args);
    });
  }

  finishWork() {
    console.log("UI设计稿完成");
    this.mediator.emit(
      this,
      "UIReady",
      Role.FE,
      "这是我的设计稿，前端可以拿着这个进行开发了"
    );
  }
}
