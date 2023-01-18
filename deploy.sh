#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 删除文件
rm -rf node_modules
# 安装文件
# yarn
# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress

rm -rf /Users/yangjohn/Desktop/dist

mv dist /Users/yangjohn/Desktop

cd -

git checkout master -f

cp -r /Users/yangjohn/Desktop/dist/. .

git add .

git commit -m "更新"

git push && git checkout main

cd -