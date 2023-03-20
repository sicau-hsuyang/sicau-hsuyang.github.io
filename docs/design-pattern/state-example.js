class GreenLight {
  turnon(ctx) {
    console.log("绿灯亮起");
    ctx.state = this.next || (this.next = new YellowLight());
  }
}

class YellowLight {
  turnon(ctx) {
    console.log("黄灯闪烁，红灯即将亮起");
    ctx.state = this.next || (this.next = new RedLight());
  }
}

class RedLight {
  turnon(ctx) {
    console.log("红灯亮起");
    ctx.state = this.next || (this.next = new GreenLight());
  }
}

class SignalLight {
  state = new GreenLight();

  loop() {
    this.state.turnon(this);
  }
}

const light = new SignalLight();

function start(immediate) {
  setTimeout(() => {
    light.loop();
    start();
  }, 1000);
  immediate && light.loop();
}

start(1);