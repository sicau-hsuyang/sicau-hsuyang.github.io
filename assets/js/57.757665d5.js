(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{367:function(t,a,s){"use strict";s.r(a);var n=s(14),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"kmp-算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kmp-算法"}},[t._v("#")]),t._v(" KMP 算法")]),t._v(" "),a("p",[a("code",[t._v("KMP")]),t._v(" 算法是什么？主要解决的问题是在给定一个字符串 "),a("code",[t._v("template")]),t._v(",快速的发现是否在 "),a("code",[t._v("template")]),t._v(" 存在子串 "),a("code",[t._v("pattern")]),t._v("。")]),t._v(" "),a("p",[a("code",[t._v("KMP")]),t._v(" 算法是一种改进的字符串匹配算法，由"),a("code",[t._v("D.E.Knuth")]),t._v("，"),a("code",[t._v("J.H.Morris")]),t._v(" 和 "),a("code",[t._v("V.R.Pratt")]),t._v(" 提出的，所以由 3 位杰出的前辈的名字各取了一个字母得名。在某些版本的《数据结构》这门课中，存在于“串”这一章节。")]),t._v(" "),a("p",[a("code",[t._v("KMP")]),t._v(" 算法是出了名的难，其思想可能大多数同学都能掌握，但关键是求"),a("code",[t._v("next数组")]),t._v("，很多同学都没有理解为什么简短的几行代码就可实现神奇的效果，网上的博客或视频大多对于"),a("code",[t._v("next数组")]),t._v("对求解过程也是一笔带过，而"),a("code",[t._v("KMP")]),t._v("算法如果你不搞懂对"),a("code",[t._v("next数组")]),t._v("求解过程，那么你就不算真正懂得的 "),a("code",[t._v("KMP")]),t._v(" 算法。")]),t._v(" "),a("h3",{attrs:{id:"朴素法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#朴素法"}},[t._v("#")]),t._v(" 朴素法")]),t._v(" "),a("p",[t._v("在介绍 "),a("code",[t._v("KMP")]),t._v(" 算法之前不得不提蛮力匹配算法，因为了解了蛮力匹配算法才能通过比较知道 "),a("code",[t._v("KMP")]),t._v(" 算法的优势。")]),t._v(" "),a("p",[t._v("之所以说它是蛮力匹配算法，设定 2 个指针，指针表示在主串上移动的位置，j 指针表示在目标字符串上的位置，就是通过一位一位的去比较，如果匹配失败，则 j 指针归 0，i 指针向后挪动一位，这其实并没有把之前子串上已经匹配到的内容利用起来，所以这个算法是快不起来的。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("subString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("tpl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pattern")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" m "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" tpl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" m "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" j "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("j "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" tpl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("j "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("其大概得算法流程如下：")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3568287c02424ffeb2b6d663699cc77b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?")}})]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/488ed9bbbf59447c8db02313e6765ba1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?")}}),t._v('"\n')]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b687e42f5bbe4c9f996331163adf8340~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?")}}),t._v('"\n')]),t._v("\n当遇到不匹配的时候，i指针向后移动一位，j指针回溯\n"),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c530cdfc7f84d41b58a10d1b1dc6e32~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?")}})]),t._v("\n蛮力匹配的问题就出在这个i,j指针的回溯上，因此`KMP`算法的核心就是解决回溯。\n"),a("h4",{attrs:{id:"朴素法的复杂度分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#朴素法的复杂度分析"}},[t._v("#")]),t._v(" 朴素法的复杂度分析")]),t._v(" "),a("p",[t._v("朴素法是简单的两个循环相叠加，因此其时间复杂度是"),a("code",[t._v("O(m*n)")]),t._v("，m 和 n 分别为两个字符串的长度")]),t._v(" "),a("h3",{attrs:{id:"kmp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kmp"}},[t._v("#")]),t._v(" KMP")]),t._v(" "),a("p",[t._v("KMP 算法的聪明之处就是可以把之前已经匹配过的信息利用起来，用最小的代价知道我们下一次应该从哪个位置开始匹配。")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/KMP/direction.png")}})]),t._v(" "),a("p",[t._v("假设现在在 x 和 c 的位置发生失配，那么，我们只需要把模式串"),a("code",[t._v("pattern")]),t._v("向前进 c 之前的"),a("strong",[t._v("最长前后公共子串")]),t._v("的长度，即图上的 ab 子串。")]),t._v(" "),a("p",[t._v("因为只有前后公共子串的话，你挪动过去才有可能相配啊。简单一点儿的例子就好比一把两头都可以拧螺丝的扳手，你把这头拿去拧螺丝，跟把另外一头拿去拧螺丝，必须得跟螺丝的规格相配，如果都配的话，那么就无所谓你用那一头拧了。")]),t._v(" "),a("p",[t._v("在明白匹配失败之后的操作之后，我们就需要去计算这个"),a("code",[t._v("最长前后公共子串")]),t._v("，即上文所说的"),a("code",[t._v("next数组")]),t._v("。")]),t._v(" "),a("p",[t._v("为什么我们要先求"),a("code",[t._v("next数组")]),t._v("呢，可以看到，我们的"),a("code",[t._v("pattern")]),t._v("字符串其实是给定的，在匹配的过程中是不会发生变化的，那么，在每次失配的时候，我们一定知道当前失配位置前面是什么样的字符串，利用"),a("a",{attrs:{href:"/data-structure/hash/desc"}},[t._v("哈希表")]),t._v("的思想，我们可以事先把每个位置的最长公共前后缀先算出来。")]),t._v(" "),a("p",[t._v("接下来就是给出 "),a("code",[t._v("KMP")]),t._v(" 算法最关键的 "),a("code",[t._v("next 数组")]),t._v(" 求解过程：")]),t._v(" "),a("p",[t._v("假设我们有如下"),a("code",[t._v("pattern")]),t._v(": "),a("code",[t._v("abcabca")])]),t._v(" "),a("p",[t._v("对于子串"),a("code",[t._v("a")]),t._v("（即在匹配的时候，在它的下一个位置 "),a("code",[t._v("b")]),t._v("这个位置发生失配，后面也是这个意思，不赘述），没有公共前后缀，所以计为 0。")]),t._v(" "),a("p",[t._v("对于子串"),a("code",[t._v("ab")]),t._v("，前缀有"),a("code",[t._v("a")]),t._v(", 后缀"),a("code",[t._v("b")]),t._v(",没有相同的前后缀，计为 0；")]),t._v(" "),a("p",[t._v("对于子串"),a("code",[t._v("abc")]),t._v("，前缀"),a("code",[t._v("a")]),t._v(","),a("code",[t._v("ab")]),t._v("； 后缀"),a("code",[t._v("c")]),t._v(","),a("code",[t._v("bc")]),t._v(",没有相同的前后缀，计为 0；")]),t._v(" "),a("p",[t._v("对于子串"),a("code",[t._v("abca")]),t._v("，前缀有"),a("code",[t._v("a")]),t._v("，"),a("code",[t._v("ab")]),t._v("，"),a("code",[t._v("abc")]),t._v("；后缀有"),a("code",[t._v("a")]),t._v("，"),a("code",[t._v("ca")]),t._v("，"),a("code",[t._v("bca")]),t._v("，最大公共前后缀"),a("code",[t._v("a")]),t._v("，计为 1；")]),t._v(" "),a("p",[t._v("对于子串"),a("code",[t._v("abcab")]),t._v("，前缀有"),a("code",[t._v("a")]),t._v("，"),a("code",[t._v("ab")]),t._v("，"),a("code",[t._v("abc")]),t._v("，"),a("code",[t._v("abca")]),t._v("；后缀有"),a("code",[t._v("b")]),t._v("，"),a("code",[t._v("ab")]),t._v("，"),a("code",[t._v("cab")]),t._v("，"),a("code",[t._v("bcab")]),t._v("，最大公共前后缀"),a("code",[t._v("ab")]),t._v("，计为 2；")]),t._v(" "),a("p",[t._v("对于子串"),a("code",[t._v("abcabc")]),t._v("，前缀有"),a("code",[t._v("a")]),t._v("，"),a("code",[t._v("ab")]),t._v("，"),a("code",[t._v("abc")]),t._v("，"),a("code",[t._v("abca")]),t._v("，"),a("code",[t._v("abcab")]),t._v("；后缀有"),a("code",[t._v("c")]),t._v("，"),a("code",[t._v("bc")]),t._v("，"),a("code",[t._v("abc")]),t._v("，"),a("code",[t._v("cabc")]),t._v("，"),a("code",[t._v("bcabc")]),t._v("，最大公共前后缀"),a("code",[t._v("abc")]),t._v("，计为 3；")]),t._v(" "),a("p",[t._v("其实最后一个我们是没有多大的算的必要的，因为要在最后一个 a 的后面一位发生失配，这个可能吗？都匹配成功了，还需要什么匹配呢，但是只不过我们算"),a("code",[t._v("next数组")]),t._v("的过程中，没有必要去对这个进行特值处理，为了方便编程，所以还是会将其计算在里面。")]),t._v(" "),a("p",[t._v("所以对于子串"),a("code",[t._v("abcabca")]),t._v("，前缀有"),a("code",[t._v("a")]),t._v("，"),a("code",[t._v("ab")]),t._v("，"),a("code",[t._v("abc")]),t._v("，"),a("code",[t._v("abca")]),t._v("，"),a("code",[t._v("abcab")]),t._v("，"),a("code",[t._v("abcabc")]),t._v("；后缀有 "),a("code",[t._v("a")]),t._v(", "),a("code",[t._v("ca")]),t._v("，"),a("code",[t._v("bca")]),t._v("，"),a("code",[t._v("abca")]),t._v("，"),a("code",[t._v("cabca")]),t._v("，"),a("code",[t._v("bcabca")]),t._v("，最大公共前后缀"),a("code",[t._v("a")]),t._v("，计为 1；")]),t._v(" "),a("p",[t._v("列一个表格，如下：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("a")]),t._v(" "),a("th",[t._v("b")]),t._v(" "),a("th",[t._v("c")]),t._v(" "),a("th",[t._v("a")]),t._v(" "),a("th",[t._v("b")]),t._v(" "),a("th",[t._v("c")]),t._v(" "),a("th",[t._v("a")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td",[t._v("1")]),t._v(" "),a("td",[t._v("2")]),t._v(" "),a("td",[t._v("3")]),t._v(" "),a("td",[t._v("1")])])])]),t._v(" "),a("p",[t._v("刚才我们已经知道最长公共前后缀的求解方法了，接下来开始思考一下怎么用代码去实现。")]),t._v(" "),a("p",[t._v("首先看一下，比较朴素的方法。")]),t._v(" "),a("p",[t._v("首部取一个字符，尾部取一个字符比较，继续重复这个操作，2 个字符进行比较，不断继续重复这个操作，直到 j 个字符串的长度。")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/KMP/naive-common-substr.png")}})]),t._v(" "),a("p",[t._v("上述算法的比较次数为：1+2+3+...+"),a("code",[t._v("(j+1)/2")]),t._v("+...+j = O(j²)")]),t._v(" "),a("p",[t._v("这个方法效率不高，因此我们得采取另外的方案，接下来看看三位巨擘是怎么做的。")]),t._v(" "),a("p",[t._v("更好的这个方案是"),a("code",[t._v("动态规划")]),t._v("，主要是利用了"),a("code",[t._v("回溯")]),t._v("的思想。")]),t._v(" "),a("p",[t._v("在阅读下文之前，请先在心里面默念三遍"),a("strong",[t._v("next 数组保存的是子串的最长公共前后缀")]),t._v("，加深一下大脑的认识。")]),t._v(" "),a("p",[t._v("下面我们来理解它是怎么样的一个流程：")]),t._v(" "),a("p",[t._v("数组"),a("code",[t._v("next[X]")]),t._v("指向的是前缀，"),a("code",[t._v("i")]),t._v("指向的是后缀，假设在某个时刻如下：")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/KMP/next-step1.png")}})]),t._v(" "),a("p",[t._v("假设前面最长相同前缀为"),a("code",[t._v("next[j-1]")]),t._v("，最长相同后缀是"),a("code",[t._v("i-1")]),t._v("这个位置，那么，如果"),a("code",[t._v("next[j-1]+1")]),t._v("这个位置和"),a("code",[t._v("i")]),t._v("这个位置上的字符相同的话，那我们至少可以粗略的得出一个结论：")]),t._v(" "),a("p",[a("code",[t._v("next[j] >= next[j-1]+1")]),t._v("。")]),t._v(" "),a("p",[t._v("有没有可能"),a("code",[t._v("next[j] > next[j-1]+1")]),t._v("呢？")]),t._v(" "),a("p",[t._v("我们先假设可能存在这样的情况")]),t._v(" "),a("p",[a("strong",[t._v("注意：下图中红色色块和蓝色色块并不是它们相等的意思，是描述这两个色块加入能否让"),a("code",[t._v("next[j]")]),t._v("变得更长。")])]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/KMP/next-step2.png")}})]),t._v(" "),a("p",[t._v("那么，根据假设，则应该存在：")]),t._v(" "),a("p",[a("strong",[t._v("两个蓝色的色块应该相等才对")])]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/KMP/next-step3.png")}})]),t._v(" "),a("p",[t._v("如这种场景：")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/KMP/next-step4.png")}})]),t._v(" "),a("p",[t._v("那么，对于长度为"),a("code",[t._v("[0, i-1]")]),t._v("的子串，最长公共前缀应该指向"),a("code",[t._v("next[j-1] + 1")]),t._v("才对，而不应该是指向"),a("code",[t._v("next[j-1]")]),t._v("。所以我们可以得出结论，"),a("strong",[t._v("每新增一个字符，最长公共前缀只有可能增加 1，即： "),a("code",[t._v("next[j-1] + 1 = next[j]")])])]),t._v(" "),a("p",[t._v("上面我们讨论了匹配成功的情况，那么，如果失配呢？比如下图：")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/KMP/next-step5.png")}})]),t._v(" "),a("p",[t._v("因为我们的 "),a("code",[t._v("next[j-1]")]),t._v("是一个递推计算的结果，我们此刻是能够知道"),a("code",[t._v("next[next[j-1]]")]),t._v("的。（想不明白的同学可以在此多思考一下，动态规划的问题本来就非常难以让人理解，想想刚才让你默念三遍的话）。\n如下图所示：")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/KMP/next-step6.png")}})]),t._v(" "),a("p",[t._v("因此，我们可以回到如下状态重新开启匹配，如下图所示：")]),t._v(" "),a("div",{attrs:{align:"center"}},[a("img",{attrs:{src:t.$withBase("/KMP/next-step7.png")}})]),t._v(" "),a("p",[t._v("因此，又重复回到了我们刚才的流程。")]),t._v(" "),a("p",[t._v("这个解题思路非常复杂，它是"),a("code",[t._v("回溯")]),t._v("和"),a("code",[t._v("动态规划")]),t._v("思想的结合，"),a("strong",[t._v("一般"),a("code",[t._v("回溯")]),t._v("都会和"),a("code",[t._v("递归")]),t._v("挂钩，但是"),a("code",[t._v("递归")]),t._v("有时候会存在大量的重复计算，所以会考虑逆向思维将其转变为"),a("code",[t._v("动规规划")]),t._v("问题")]),t._v("，这些都是算法里面较难且非常锻炼思维能力的章节（我个人感受是在面试中遇到"),a("code",[t._v("动态规划")]),t._v("算法题，就全靠你和公司的缘分了），这方面比较小白的朋友，可以尝试学习"),a("a",{attrs:{href:"https://www.icourse163.org/course/PKU-1001894005?tid=1001994002",target:"_blank",rel:"noopener noreferrer"}},[t._v("这门课程"),a("OutboundLink")],1),t._v("，相信你学过之后，再回头查看这篇博客，你会有新的理解。")]),t._v(" "),a("p",[t._v("整个求解"),a("code",[t._v("next数组")]),t._v("的算法的实现过程如下：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * 生成next数组\n * @param {String} pattern\n * @param {Number[]} next\n */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("genNext")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("pattern")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" m "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" next "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 因为第一个字符串没有前后缀，所以可以直接赋值0，相当于动态规划可直接求得的初始条件")]),t._v("\n  next"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//当取一个字符的时候，肯定是一个前后缀都没有的")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" j "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果没有匹配到，递归的去求之前的最大前缀")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 退出循环条件是 k大于0 并且当前位置的字符串要是一样的")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("j "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 回溯，找到上一次的最大前后缀的长度")]),t._v("\n      j "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" next"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果匹配到了，最大的前后缀+1")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 求出当前字符串的最大公共前后缀，更新next数组")]),t._v("\n    next"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" next"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("看到这儿，如果你全部都理解了的话，恭喜你，其实你已经掌握"),a("code",[t._v("KMP")]),t._v("算法了。")]),t._v(" "),a("p",[a("code",[t._v("KMP")]),t._v("算法搜索流程非常简单，其的实现如下：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * KMP-Search\n * @param {String} tpl\n * @param {String} pattern\n * @returns\n */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("kmpSearch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("tpl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pattern")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" tpl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    m "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" pos "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" next "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("genNext")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" q "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 不断回溯，直到存在最长公共前后缀或回退到0，此处思路和求next数组求解思路一致。 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("q "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("q"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" tpl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      q "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" next"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("q "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果当前字符和模式字符串指针位上的字符相等, 模式指针后移一位")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pattern"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("q"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" tpl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      q"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n     *  上述2个if不能交换位置，必须先判断是否匹配失败，才能继续进行匹配，如果交换的话，q指针先向后移动了一位，当前循环并没有结束，i指针还在前一个位置，此刻出现了错位，那么函数将不会正常运行。\n     */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果模式字符串指针的位置走到了最后一位，则说明匹配成功了")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("q "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 因为当前匹配的位置实际上是在pattern的length-1的位置上")]),t._v("\n      pos "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" m "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" pos"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"kmp-的复杂度分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kmp-的复杂度分析"}},[t._v("#")]),t._v(" KMP 的复杂度分析")]),t._v(" "),a("p",[t._v("在生成"),a("code",[t._v("next数组")]),t._v("的时候，我们看到是一个"),a("code",[t._v("for")]),t._v("循环和"),a("code",[t._v("while")]),t._v("循环嵌套，可以看到的是，每次"),a("code",[t._v("j")]),t._v("最坏退到"),a("code",[t._v("0")]),t._v("，但是只有在"),a("code",[t._v("pattern[i] === pattern[j]")]),t._v("的时候，"),a("code",[t._v("j")]),t._v(" 才会递增的。"),a("code",[t._v("j")]),t._v("回退的总次数，是不会超过"),a("code",[t._v("j")]),t._v("增加的总次数的，最坏情况下，"),a("code",[t._v("j")]),t._v("累加的总次数是不会超过"),a("code",[t._v("m")]),t._v("的，所以"),a("code",[t._v("while")]),t._v("循环的执行次数是不会超过"),a("code",[t._v("O(m)")]),t._v("。所以生成"),a("code",[t._v("next数组")]),t._v("的时间复杂度是"),a("code",[t._v("O(m)")]),t._v("。在搜索过程中，同理。因此算法总的时间复杂度为 "),a("code",[t._v("O(m+n)")]),t._v("，m 和 n 分别为两个字符串的长度；")]),t._v(" "),a("p",[t._v("因为生成"),a("code",[t._v("next数组")]),t._v("占用了一定的空间，所以空间复杂度为"),a("code",[t._v("O(m)")]),t._v("，m 为子字符串的长度。")])])}),[],!1,null,null,null);a.default=e.exports}}]);