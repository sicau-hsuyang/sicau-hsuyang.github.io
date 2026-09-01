class App {
  /**
   * 应用程序上下文
   */
  application;

  middlewares = [];

  /**
   * 挂载中间件
   * @param {(Context, NextFunction) => void} fn
   */
  use(fn) {
    this.middlewares.push(fn);
  }

  async call(idx) {
    if (idx >= this.middlewares.length) {
      return Promise.resolve();
    }
    const task = this.middlewares[idx];
    await task(this.application, this.call.bind(this, idx + 1));
  }

  async listen() {
    this.call(0);
  }
}

const app = new App();

app.use(async function middleware(ctx, next) {
  await next();
});

app.listen();
