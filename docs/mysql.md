# MySQL 学习笔记

## 登录

```bash
mysql -u root -p -h localhost -P 3306
```

## 常见命令

```bash
# 显示所有的数据库
show databases;
# 选择数据库 xxx
use xxx;
# 展示数据的表
show tables;
show tables from xxx;
# 显示当前所在的数据库
select database();
# 查看指定表的表结构
desc xxx;
# 查看数据库的版本
select version();
## 利用bash命令
mysql --version;
mysql -V;
```

## 注释

单行注释： `-- 注释内容`;（注意--后面有一个空格）
单行注释：`#注释内容`
多行注释：`/* 我是一个注释内容 */`

## DQL 语言

### 查询

```bash
# 从表中查询字段
select * from employees;
select username,age,gender from employees;
select username as myName from employees;
# 关键字区分
# select NAME from employees NAME会被当做关键字，因此可以用``包起来，如。
select `name` from employees;

# 查询常量值
select 100
# 查询函数
select NOW();
select version();
# 查询表达式
select 2*100;

# 别名 as可以省略
select 2+100 as `add`;
select 2/100 'test';

# 去重 distinct;
select distinct * from employees;

# + 只存在数值相加的功能，但是如果是字符串和数字相加，则判断能否转化成数字型，能转就转，不能转就相当于是0
# NULL和任何内容连接都是NULL
```

## DML 语言

## DDL 语言
