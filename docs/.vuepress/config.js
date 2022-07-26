module.exports = {
  title: "awesome-frontend-code",
  theme: "vt",
  description: "HsuYang的个人博客，主要对于平时学习知识的理解与记录",
  themeConfig: {
    enableDarkMode: true,
    repo: "https://github.com/sicau-hsuyang/sicau-hsuyang.github.io.git",
    nav: [
      { text: "数据结构&算法", link: "/data-structure/" },
      { text: "设计模式", link: "/design-pattern/" },
      { text: "JavaScript", link: "/javascript/" },
      { text: "前端框架", link: "/frameworks/" },
    ],
    sidebar: {
      "/javascript/": [
        { title: "JavaScript专题", path: "/javascript/" },
        { title: "函数上下文this", path: "/javascript/this" },
        { title: "原型", path: "/javascript/prototype" },
        { title: "继承", path: "/javascript/extend" },
        { title: "闭包", path: "/javascript/closure" },
        { title: "Ajax", path: "/javascript/ajax" },
        { title: "手写", children: [] },
        { title: "es6", children: [] },
      ],
      "/data-structure/": [
        { title: "常见的数据结构和算法", path: "/data-structure/" },
      ],
      "/design-pattern/": [
        { title: "面向对象设计原则&设计模式", path: "/design-pattern/" },
        { title: "单例模式", path: "/design-pattern/singleton" },
        { title: "工厂模式", path: "/design-pattern/factory" },
        { title: "命令模式", path: "/design-pattern/command" },
        { title: "代理模式", path: "/design-pattern/proxy" },
        { title: "观察者模式", path: "/design-pattern/watcher" },
        { title: "桥接模式", path: "/design-pattern/bridge" },
        { title: "适配器模式", path: "/design-pattern/adaptor" },
        { title: "装饰模式", path: "/design-pattern/decorator" },
        { title: "策略模式", path: "/design-pattern/strategy" },
        { title: "享元模式", path: "/design-pattern/flyweight" },
        { title: "中介者模式", path: "/design-pattern/mediator" },
      ],
    },
    codeSwitcher: {
      groups: {
        default: { ts: "TypeScript", js: "JavaScript" },
        "plugin-usage": { tuple: "Tuple", object: "Object" },
      },
    },
  },
  head: [
    // 添加百度统计
    [
      "script",
      {},
      `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?2c567a12c7860a8915d6ce4cb17a538e";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
      `,
    ],
    ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
  ],
};
