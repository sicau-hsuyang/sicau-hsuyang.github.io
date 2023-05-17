(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{377:function(r,t,s){"use strict";s.r(t);var a=s(14),i=Object(a.a)({},(function(){var r=this,t=r._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[t("h2",{attrs:{id:"二叉树的-morris-遍历法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二叉树的-morris-遍历法"}},[r._v("#")]),r._v(" 二叉树的 Morris 遍历法")]),r._v(" "),t("p",[r._v("二叉树的 "),t("code",[r._v("Morris遍历法")]),r._v("是在传统二叉树遍历法的又一次改进。")]),r._v(" "),t("p",[r._v("正常我们遍历二叉树时，都会有一定的空间复杂度，不管是利用递归还是非递归遍历，栈里面都要把树节点存起来，因为在遍历完成底部的也节点之后，我们需要顺着栈里面记录线索去找上层后面的节点。对于层序遍历来说，仍然需要把当前处理的儿子节点（若有）加入到队列中，也需要占用额外的内存。而"),t("code",[r._v("Morris遍历法")]),r._v("利用了二叉树的空闲指针，巧妙的用它记录后续的需要处理的节点，在完成底部的叶节点之后清楚的知道后面需要处理的节点在哪儿。")]),r._v(" "),t("h2",{attrs:{id:"递归序"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#递归序"}},[r._v("#")]),r._v(" 递归序")]),r._v(" "),t("p",[r._v("首先，我们得明白什么是递归序。")]),r._v(" "),t("p",[r._v("对于这颗二叉树：")]),r._v(" "),t("div",{attrs:{align:"center"}},[t("img",{attrs:{src:r.$withBase("/tree/morris/binary-tree.png"),width:"400",alt:"二叉树"}})]),r._v(" "),t("p",[r._v("不管怎么样，3 节点永远会比 2 节点和 4 节点先访问到，只不过，我们在某些场合，不是遇到 3 节点就立刻将其输出。因为有栈的关系，当我们处理到最叶节点的时候，能够根据栈内容清楚的知道回溯的准确位置。")]),r._v(" "),t("h2",{attrs:{id:"morris-先序"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#morris-先序"}},[r._v("#")]),r._v(" Morris 先序")]),r._v(" "),t("h2",{attrs:{id:"morris-中序"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#morris-中序"}},[r._v("#")]),r._v(" Morris 中序")]),r._v(" "),t("h2",{attrs:{id:"morris-后序"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#morris-后序"}},[r._v("#")]),r._v(" Morris 后序")]),r._v(" "),t("h2",{attrs:{id:"复杂度分析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#复杂度分析"}},[r._v("#")]),r._v(" 复杂度分析")])])}),[],!1,null,null,null);t.default=i.exports}}]);