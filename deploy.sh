#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 删除文件
rm -rf node_modules
# 安装文件
yarn
# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress

rm -rf /usr/local/dist

mv dist /usr/local/dist

cd -

git checkout master

cp -r /usr/local/dist/. .

git add .

git commit -m "更新"

git push && git checkout main

cd -