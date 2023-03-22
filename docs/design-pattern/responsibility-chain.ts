abstract class Component {
  successor?: Component;

  setSuccessor(next: Component) {
    this.successor = next;
  }

  abstract exec(target: Map<string, string>): void;
}

class ComputerComponent extends Component {
  exec(target: Map<string, string>): void {
    target.set("computer", "Windows 98");
    console.log("计算机行业处理");
    this.successor?.exec(target);
  }
}

class FinanceComponent extends Component {
  exec(target: Map<string, string>): void {
    target.set("finance", "招商银行600036");
    console.log("金融行业处理");
    this.successor?.exec(target);
  }
}

class MedicalComponent extends Component {
  exec(target: Map<string, string>): void {
    target.set("medical", "APTX 4869");
    console.log("医药行业处理");
    this.successor?.exec(target);
  }
}

class AgricultureComponent extends Component {
  exec(target: Map<string, string>): void {
    target.set("agriculture", "杂交水稻");
    console.log("农业行业处理");
    this.successor?.exec(target);
  }
}

class Invoker {
  chian: Component;

  constructor(component: Component) {
    this.chian = component;
  }

  doWork() {
    const map = new Map();
    this.chian.exec(map);
    console.log(map);
  }
}

const computer = new ComputerComponent();
const finance = new FinanceComponent();
const medical = new MedicalComponent();
const agriculture = new AgricultureComponent();

computer.setSuccessor(finance);
finance.setSuccessor(medical);
medical.setSuccessor(agriculture);

const invoker = new Invoker(computer);

invoker.doWork();
