(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{328:function(t,a,s){"use strict";s.r(a);var e=s(14),v=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"哈希表的概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#哈希表的概念"}},[t._v("#")]),t._v(" 哈希表的概念")]),t._v(" "),a("p",[t._v("散列表（Hash table，也叫哈希表），是根据关键码值(Key value)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫做散列表。（copy 自百度百科）")]),t._v(" "),a("p",[t._v("在实际的开发中，我们并不需要真正的去编写哈希函数，不会去实现关键字到地址的映射，或者知道怎么去处理哈希冲突这类操作。")]),t._v(" "),a("p",[t._v("每当存储的每一个关键字，表中就会多加入用相应的内容，因此增加一条映射空间复杂度计为"),a("code",[t._v("O(1)")]),t._v("；每次我们对数据的访问是一次直接的常数运算，因此时间复杂度计为"),a("code",[t._v("O(1)")]),t._v("。")]),t._v(" "),a("p",[t._v("因为哈希表的查找非常快速，所以在实际开发中我们经常用它空间换时间（现在的计算机的性能都非常可观的，因此，我们会更加追求程序的运行速度）降低程序的时间复杂度。比如我们会根据数据的唯一性标识建立映射关系，后面在需要用到这个数据的时候，直接用它的唯一性标识从哈希表中读取。")]),t._v(" "),a("h2",{attrs:{id:"实际开发中的哈希表"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实际开发中的哈希表"}},[t._v("#")]),t._v(" 实际开发中的哈希表")]),t._v(" "),a("p",[t._v("在 JS 中，我们的对象本身就是一个哈希表，因此经常我们可以在代码中看到这样的代码.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" map "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("在 JS 中，使用对象做哈希表存在一个问题，只能使用"),a("code",[t._v("字符串")]),t._v("或者"),a("code",[t._v("Symbol")]),t._v("作为"),a("code",[t._v("key")]),t._v("。")]),t._v(" "),a("p",[t._v("ES6 中引入了两个新的结构，"),a("code",[t._v("Map")]),t._v("和"),a("code",[t._v("WeakMap")]),t._v("，可以支持任意类型做 "),a("code",[t._v("key")]),t._v("。关于 ES 的语法的问题，我们不在这儿细讲，后面会在专门的专题细讲。")]),t._v(" "),a("p",[t._v("关于哈希表没有什么特别多的概念可讲，因此，哈希表这一章节，我们主要是阐述其应用。")])])}),[],!1,null,null,null);a.default=v.exports}}]);