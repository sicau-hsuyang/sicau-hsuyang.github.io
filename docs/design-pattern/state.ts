class Context {
  private _state: State;

  get state(): State {
    return this._state;
  }

  private set state(nextState: State) {
    console.log(
      `当前状态：${this._state.stateName}, 下一个状态：${nextState.stateName}`
    );
    this._state = nextState;
  }

  constructor(initState: State) {
    this._state = initState;
  }

  setState(state: State) {
    this.state = state;
  }

  request() {
    this.state.handler(this);
  }
}

abstract class State {
  abstract stateName: string;
  public abstract handler(ctx: Context): void;
}

class GetUpState extends State {
  stateName: string = "起床状态";

  public handler(ctx: Context): void {
    console.log("起床啦~~~~~~~~~~~");
    ctx.setState(new EatState());
  }
}

class EatState extends State {
  stateName: string = "吃饭状态";

  public handler(ctx: Context): void {
    console.log("吃饭啦~~~~~~~~~~~");
    ctx.setState(new WorkState());
  }
}

class WorkState extends State {
  stateName: string = "工作状态";

  public handler(ctx: Context): void {
    console.log("工作啦~~~~~~~~~~~~~");
    ctx.setState(new SleepState());
  }
}

class SleepState extends State {
  stateName: string = "睡觉状态";

  public handler(ctx: Context): void {
    console.log("睡觉啦~~~~~~~~~~~~~~");
  }
}

const ctx = new Context(new GetUpState());

ctx.request();

ctx.request();

ctx.request();

ctx.request();

ctx.request();
