(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{341:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"洗牌算法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#洗牌算法"}},[t._v("#")]),t._v(" 洗牌算法")]),t._v(" "),s("p",[t._v("洗牌算法，是"),s("code",[t._v("D.E.Knuth")]),t._v("教授改进之后的算法，是不是觉得这个名字有点儿熟悉？对，你记性真好呢，"),s("code",[t._v("KMP")]),t._v("算法的"),s("code",[t._v("K")]),t._v("就是来源于唐纳德教授的名字。")]),t._v(" "),s("p",[t._v("这个算法的思路理解起来也比较简单，接下来我们就描述一下这个算法的执行过程，并分析它是如何保证数据能够被等概率打乱的。")]),t._v(" "),s("p",[t._v("假设有"),s("code",[t._v("N")]),t._v("个数据（下标则是"),s("code",[t._v("[0,N-1]")]),t._v("），第一步随机从"),s("code",[t._v("0-N-1")]),t._v("的范围里面随便取一个索引（我们从后向前面处理），并将这个索引的值交换到"),s("code",[t._v("N-1")]),t._v("这个下标上。这个操作中，每个数被取到的概率都是均等的。经过这个操作之后，将待处理的数据的规模减 1。")]),t._v(" "),s("div",{attrs:{align:"center"}},[s("img",{attrs:{src:t.$withBase("/list/shuffle-1.png"),alt:"shuffle"}})]),t._v(" "),s("p",[s("strong",[t._v("第一步")]),t._v("：元素"),s("code",[t._v("5")]),t._v("被选中的概率是"),s("code",[t._v("1/5")])]),t._v(" "),s("div",{attrs:{align:"center"}},[s("img",{attrs:{src:t.$withBase("/list/shuffle-2.png"),alt:"shuffle"}})]),t._v(" "),s("p",[s("strong",[t._v("第二步")]),t._v("：元素"),s("code",[t._v("3")]),t._v("被选中的概率是"),s("code",[t._v("4/5")]),t._v(" * "),s("code",[t._v("1/4")]),t._v(" = "),s("code",[t._v("1/5")]),t._v("（第一轮没有被选中概率是"),s("code",[t._v("4/5")]),t._v("，第二轮被选中，概率是"),s("code",[t._v("1/4")]),t._v("，看不懂的请查看概率论的知识点）")]),t._v(" "),s("div",{attrs:{align:"center"}},[s("img",{attrs:{src:t.$withBase("/list/shuffle-3.png"),alt:"shuffle"}})]),t._v(" "),s("p",[s("strong",[t._v("第五步")]),t._v(": 元素"),s("code",[t._v("5")]),t._v("被选中的概率是"),s("code",[t._v("4/5")]),t._v("* "),s("code",[t._v("3/4")]),t._v(" * "),s("code",[t._v("2/3")]),t._v(" * "),s("code",[t._v("1/2")]),t._v(" * "),s("code",[t._v("1")]),t._v(" = "),s("code",[t._v("1/5")]),t._v("(前面 4 个代表没有被选中的概率，最后一个代表一定会被选中)")]),t._v(" "),s("p",[t._v("不断的重复上述过程，直到处理到数组的第一个元素，则完成了数组的随机化处理，并且保证了数组每个元素被等概率的随机化。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * 随机化数组\n * @param {number[]} arr 待随机化数组\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("shuffle")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("arr")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 因为JS的随机数范围是[0, 1)，对其取floor之后，随机数范围则变成了[0, i - 1]， 所以为了保证，每个数都有机会被选取到，生成随机索引时，要传入i+1，")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使得生成的随机数索引范围在[0, i]之间")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" rndIdx "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("floor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Math"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("random")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将随机选中的数交换到当前处理的位置上")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" tmp "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rndIdx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rndIdx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" tmp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 完成交换之后，数据规模递减，直到完成所有的处理")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[t._v("DANGER")]),t._v(" "),s("p",[t._v("需要注意的就是"),s("code",[t._v("JS")]),t._v("的随机数的范围是"),s("code",[t._v("[0, 1)")]),t._v("的半闭半开区间，在经过"),s("code",[t._v("Math.floor")]),t._v("处理之后，注意需要保证能够把当前正在处理的位置上的元素有概率选进去，否则就不是真正的随机化了。")])])])}),[],!1,null,null,null);s.default=e.exports}}]);