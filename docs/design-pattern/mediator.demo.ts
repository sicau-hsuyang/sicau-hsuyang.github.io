/**
 * 定义业务枚举，主要是为了方便协助者方便找它要通知的对象
 */
enum Role {
  Mediator = "mediator",

  FEDeveloper = "FEDeveloper",

  BEDeveloper = "BEDeveloper",
}

abstract class Person {
  role: Role;

  setRole(role: Role) {
    this.role = role;
  }
}

abstract class Mediator extends Person {
  role: Role = Role.Mediator;

  protected colleagueList: Colleague[] = [];

  public abstract send(
    message: string,
    sender: Colleague,
    receiverRole: Role
  ): void;

  addColleague(colleague: Colleague) {
    this.colleagueList.push(colleague);
  }
}

abstract class Colleague extends Person {
  protected mediator: Mediator;

  constructor(mediator: Mediator) {
    super();
    this.mediator = mediator;
  }

  public abstract notifyMessage(sender: Colleague, msg: string): void;
}

class ConcreteMediator extends Mediator {
  public send(message: string, sender: Colleague, receiverRole: Role): void {
    const targetColleague = this.colleagueList.find(
      (p) => p.role === receiverRole
    );
    if (!targetColleague) {
      console.log("不存在目标角色");
      return;
    }
    targetColleague.notifyMessage(sender, message);
  }
}

class BackEndAColleague extends Colleague {
  constructor(mediator: Mediator) {
    super(mediator);
    this.setRole(Role.BEDeveloper);
  }

  public notifyMessage(sender: Colleague, msg: string): void {
    console.log("消息的发送方", sender);
    console.log("接受到的消息:" + msg);
  }

  public sendMessageA() {
    this.mediator.send("后端向前端发消息", this, Role.FEDeveloper);
  }
}

class FrontEndColleague extends Colleague {
  constructor(mediator: Mediator) {
    super(mediator);
    this.setRole(Role.FEDeveloper);
  }

  public notifyMessage(sender: Colleague, msg: string): void {
    console.log("消息的发送方", sender);
    console.log("接受到的消息:" + msg);
  }

  public sendMessageB() {
    this.mediator.send("前端向后端发消息", this, Role.BEDeveloper);
  }
}

(function bootstrap() {
  // 初始化中介者
  const mediator = new ConcreteMediator();
  // 初始化协作对象，并且需要认知中介者
  const feDeveloper = new BackEndAColleague(mediator);
  const beDeveloper = new FrontEndColleague(mediator);
  // 中介者需要认识每一个协作对象
  mediator.addColleague(feDeveloper);
  mediator.addColleague(beDeveloper);
  // 前端向后端发消息
  feDeveloper.sendMessageA();
  // 后端向前端发消息
  beDeveloper.sendMessageB();
})();
