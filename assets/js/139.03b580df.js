(window.webpackJsonp=window.webpackJsonp||[]).push([[139],{446:function(t,n,s){"use strict";s.r(n);var a=s(14),e=Object(a.a)({},(function(){var t=this,n=t._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"防抖"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#防抖"}},[t._v("#")]),t._v(" 防抖")]),t._v(" "),n("p",[t._v("防抖（"),n("code",[t._v("debounce")]),t._v("）是一种控制函数执行频率的技术。")]),t._v(" "),n("p",[t._v("它可以限制某个函数在一定时间内执行的次数，从而避免过于频繁的调用。在防抖技术中，只有在延迟一定时间后没有再次触发相同事件，才会执行该函数，否则函数就会被取消。")]),t._v(" "),n("p",[t._v("通过防抖技术，可以有效地减少一些高频率事件的执行次数，避免频繁操作给浏览器带来不必要的负担，同时也可以提升应用程序的性能。")]),t._v(" "),n("p",[t._v("如果你觉得上述的概念听起来比较晦涩难懂，那我举一个生活中实际例子你就明白了。")]),t._v(" "),n("p",[t._v("电梯，大家都乘坐过吧，电梯关门的时间是一定的，如果你进了电梯，准备下楼，但是此时有一个人按了电梯门，好了，你走不掉了，又得等一定的时间电梯才会关门，要是现在又来一个人，他又给按住了，那又得等一定的时间电梯才会关门了（如果你此时正赶着去打卡，那你内心一定是崩溃的，但是实际生活中你肯定有这种倒霉的时刻），这个过程就是防抖。")]),t._v(" "),n("h3",{attrs:{id:"_1、简单实现"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、简单实现"}},[t._v("#")]),t._v(" 1、简单实现")]),t._v(" "),n("p",[t._v("简单实现是很容易的，以下是实现：")]),t._v(" "),n("div",{staticClass:"language-ts extra-class"},[n("pre",{pre:!0,attrs:{class:"language-ts"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * 防抖\n * @param fn 原函数\n * @param delay 延迟时间\n * @returns\n */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("debounce")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fn"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("Function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" delay"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" timer"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" NodeJS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Timer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("debounced")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("clearTimeout")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("timer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    timer "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("fn")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" arguments"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" delay"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("如果你能把这个简单版本的防抖写出来，证明你至少对"),n("code",[t._v("防抖")]),t._v("、"),n("code",[t._v("闭包")]),t._v("、"),n("code",[t._v("定时器")]),t._v("等知识点熟识了，能应付简单的面试了。")]),t._v(" "),n("h3",{attrs:{id:"_2、进阶实现"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、进阶实现"}},[t._v("#")]),t._v(" 2、进阶实现")]),t._v(" "),n("p",[t._v("如果你仔细看过"),n("code",[t._v("lodash")]),t._v("关于"),n("code",[t._v("debounce")]),t._v("的"),n("code",[t._v("API")]),t._v("描述，你会发现"),n("code",[t._v("lodash")]),t._v("提供的防抖一点儿都不简单。")]),t._v(" "),n("blockquote",[n("p",[t._v("创建一个"),n("code",[t._v("debounced")]),t._v("（防抖动）函数，该函数会从上一次被调用后，延迟"),n("code",[t._v("wait")]),t._v("毫秒后调用"),n("code",[t._v("func")]),t._v("方法。 "),n("code",[t._v("debounced")]),t._v("（防抖动）函数提供一个 "),n("code",[t._v("cancel")]),t._v(" 方法取消延迟的函数调用以及"),n("code",[t._v("flush")]),t._v("方法立即调用。 可以提供一个"),n("code",[t._v("options")]),t._v("（选项） 对象决定如何调用"),n("code",[t._v("func")]),t._v("方法，"),n("code",[t._v("options.leading")]),t._v(" 与|或 "),n("code",[t._v("options.trailing")]),t._v(" 决定延迟前后如何触发（注：是 先调用后等待 还是 先等待后调用）。 "),n("code",[t._v("func")]),t._v("调用时会传入最后一次提供给"),n("code",[t._v("debounced")]),t._v("（防抖动）函数 的参数。 后续调用的"),n("code",[t._v("debounced")]),t._v("（防抖动）函数返回是最后一次"),n("code",[t._v("func")]),t._v("调用的结果。")])]),t._v(" "),n("ul",[n("li",[n("code",[t._v("func")]),t._v(" (Function): 要防抖动的函数。")]),t._v(" "),n("li",[n("code",[t._v("[wait=0]")]),t._v(" (number): 需要延迟的毫秒数。")]),t._v(" "),n("li",[n("code",[t._v("[options=]")]),t._v(" (Object): 选项对象。")]),t._v(" "),n("li",[n("code",[t._v("[options.leading=false]")]),t._v(" (boolean): 指定在延迟开始前调用。")]),t._v(" "),n("li",[n("code",[t._v("[options.maxWait]")]),t._v(" (number): 设置 func 允许被延迟的最大值。")]),t._v(" "),n("li",[n("code",[t._v("[options.trailing=true]")]),t._v(" (boolean): 指定在延迟结束后调用。")])]),t._v(" "),n("p",[t._v("为什么会多这么多的选项呢？")]),t._v(" "),n("p",[t._v("在简单版本中，我们也看到了，如果用户一直触发，那将会一次都不会触发，但是实际上我们可能希望第一次开始的时候能否先触发一次（至少有个反应嘛，免得用户以为程序出"),n("code",[t._v("bug")]),t._v("了呢），另外这个函数一旦延迟了，是不可取消的，那么就存在一些边界情况，比如现在在前端的"),n("code",[t._v("SPA")]),t._v("中，当前执行的某个操作非常性能，对其进行了防抖操作，但此刻用户或许是因为点错了又切换到了别的路由里面去了，能否不要再执行这个耗时操作了呢？")]),t._v(" "),n("p",[t._v("正因为这些问题，所以简单版本的"),n("code",[t._v("debounce")]),t._v("需要应付实际复杂的开发场景还是显得有点儿力不从心了。")])])}),[],!1,null,null,null);n.default=e.exports}}]);