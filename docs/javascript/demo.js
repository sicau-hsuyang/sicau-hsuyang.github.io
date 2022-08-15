/*
 * @Autor: Zhang Yingying
 * @Date: 2022-08-15 18:07:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-08-15 18:12:59
 */

const obj = { name: "yangxu", age: 28, vocation: "web-frontend developer" };

const html = `<div class="person">
                <span class='name'>{{name}}</span>
                <span class='age'>{{age}}</span>
                <span class='vocation'>{{vocation}}</span>
              </div>
            `;

// const compile = (str, targetObj) => {
//   let distStr = str;
//   Object.entries(targetObj).forEach(([prop, val]) => {
//     distStr = distStr.replace(new RegExp("{{(" + prop + ")}}"), val);
//   });
//   return distStr;
// };

const compile = (str, targetObj) => {
  let distStr = str.replace(/{{([a-zA-Z0-9]+)}}/g, function (...args) {
    return args.length > 1 && targetObj[args[1]];
  });
  return distStr;
};

const re = compile(html, obj);
console.log(re);
