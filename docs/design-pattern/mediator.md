## 中介者模式

### 1、基本概念

中介者模式（`Mediator Pattern`）是一种行为型设计模式，它通过封装一系列对象之间的交互，将对象之间的复杂关系转化为中介者对象与各个对象之间的简单交互，从而降低对象之间的耦合度。

在中介者模式中，对象之间不直接相互通信，而是通过中介者进行消息传递和协调。中介者对象拥有对各个对象的引用，可以了解和控制它们之间的关系和交互方式。当一个对象需要与其他对象进行通信时，它不需要直接与其他对象进行交互，而是通过中介者来发送消息或调用方法，由中介者将消息传递给其他相关的对象。

中介者模式的`UML`图如下：

<div align="center">
  <img :src="$withBase('/design-pattern/mediator-pattern.png')" alt="中介者模式的UML图" />
</div>

简单解释一下这个`UML`图，`Mediator`和`College`是被提炼的抽象类，`Mediator`类（**一**）里面需要持有很多个`College`类(**多**)的实例，因此此处表示的是聚合关系。不同的业务，根据其划分的业务类，`ConcreteMediator`类实现`Mediator`类，`ConcreteCollege`类实现`College`类。`ConcreteMediator`需要和对应的`ConcreteCollege`进行通信，所以有一个关联关系。

在早些年我刚毕业没多久的时候，我遇到过一个系统里面很复杂的通信关系，因为组件设计的失误，导致了很多时候组件之间通信只能使用`EventBus`的形式。于是比较囧的场景就来了，`A`组件通知到了`B`组件，在`B`组件的响应了`A`组件的事件可能又要通知`C`和`D`组件，然后`C`、`D`组件可能又要通知别的组件，如果运气不好，你去修改一个需求增加新的事件，这个事件传播链因为你增加了一个，如果一不小心形成了一个环，那完犊子了。

所以，在我之前的工作经历中，这个场景就是一个比较好的使用中介者模式重构的例子。

中介者模式的好处就是实际上把通讯的关系混乱的任意两个对象之间的通信关系进行了一个统一的管理，以后都不允许任意两个对象之间直接通信了，因此它有以下优点：

- 1、**减少了对象之间的直接依赖和耦合**，使得代码结构更清晰，易于维护和扩展。
- 2、通过集中化的中介者管理对象之间的交互，**简化了对象之间的通信方式**。
- 3、可以提高系统的灵活性和可复用性，增加了系统的可扩展性。

像我之前提到的例子，因为中介者其实它很明确的管理事件的`进`和`出`，所以如果需要增加新的通信链路，是不太容易出问题的，方便后续的需求迭代。

需要注意的是**中介者模式不是银弹，虽然简化了对象之间的通信方式，但是中介者模式的中介类是一个比较脆弱的稳定，因为一旦有需求的增加和改变，那么中介类就可能需要调整，代码的复杂度（这儿指的是逻辑上的复杂度）并没有降低，它只是从一个地方转嫁到了另外一个地方而已。**

### 2、代码示例

此处，我是参考自大话设计模式，结合自己的实际开发经验给的一个代码示例：

```ts
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
  // 初始化每个协作对象，并且需要认知中介者
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
```

### 3、在前端开发中的实践

在我的职业生涯中，中介者模式也是少有的从开始参加工作就掌握的设计模式。

在我刚毕业的时候，参与过一个基于`Electron`的金融交易系统的开发。`Electron`分为主进程和渲染进程，然后在主进程需要控制一些交易数据的监听，因为主进程是基于`Nodejs`的，可以方便使用`Socket`通信（不过我至今没想明白为什么但是不直接在渲染进程使用`WebSocket`，😂），交易窗口需要不断的订阅行情数据和退订行情数据，除此之外，不同的窗口之间也有通信的需求（如果你用过东方财富这类客户端的话，可以对一个合约代码的各类参数进行展开，相当于一个屏幕需要开启好多个子窗口，这样的子窗口就有了通信的需求），还有通知主进程新建窗口、关闭窗口等需求，在设计之初我们就考虑到这些窗口之间的交互会很复杂（当初的领导是一个前微软程序员，软件架构能力非常强）所以就采取了中介者模式来进行窗口的通信管理。

首先有一个`JS`文件配置了所有的事件名称，每个事件上分别写清楚当前事件从哪儿触发，它会触发什么事件；

主进程在一启动的时候监听它需要处理的事件；

以后，渲染进程在各自的页面内引入这个配置文件，直接使用`ipcRender`触发对应的事件到主进程。

主进程的代码如下（节选）：

```js
const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const MainLib = require("./main-process-lib").MainLib;

class UiManager extends mainLib {
  listen2Events() {
    /* 实际上很有很多监听的代码，为了篇幅，我将其删除 */
    this.ipcMain.on(this.systemEvent.tellTabChange, (event, params) => {});

    this.ipcMain.on(this.systemEvent.tellSubscribeQuote, (event, params) => {});

    this.ipcMain.on(this.systemEvent.templateCreated, (event, params) => {
      if (this.riskControlWindow !== null) {
        this.riskControlWindow.close();
      }
      // 协调向业务窗口发送数据
      if (this.centralWindow !== null) {
        this.centralWindow.webContents.send(
          this.systemEvent.deliveryTemplateCreated,
          params
        );
      }
    });
  }
}

const manager = new UiManager();
manager.listen2Events();
```

在业务窗口上的处理（节选）：

```js
const DisposablePageController = require("../../module/disposable-controller");
class PageController extends DisposablePageController {
  viewReportTemplate(product) {
    // this.ipcRender是定义在DisposablePageController的
    this.ipcRender.send(
      this.systemEvent.otherWindow2Dashboard,
      this.systemEvent.ask2OpenApp,
      {
        openerId: `opener-management-product-report-${identity}`,
        appUrl:
          path.join(__dirname, "../../ui-template/management/new-report.html") +
          `?identity=${identity}&identityName=${identity_name}&type=product` +
          `${templateId ? "&defaultTemplateId=" + templateId : ""}` +
          `${restrictTpls ? "&restricts=" + restrictTpls : ""}`,
        appName: `产品报告 > ${identity_name}`,
        shouldDestroy: true,
      }
    );
  }
}

module.exports = { WidgetClass: PageController };
```

其它的业务窗口发送事件也是通过相同的方式，我就不再赘述了。

正如上文所说，中介者所负责的业务是相当的复杂的，中介者的通信的管理代码也是最容易被改动的代码，但是这样设计的好处就是各个窗口的代码极大的得到简化。
