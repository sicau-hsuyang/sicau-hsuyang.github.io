# MySQL 学习笔记

## 登录

```bash
mysql -u root -p -h localhost -P 3306
```

## 常见命令

```sql
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
```

```bash
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

#### select

```sql
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

#### where 条件查询

1、按条件表达式

`> < = != <> >= <=`等。

```sql
select * from employees where salary > 1200;
select * from employees where department_id != 90;
```

推荐用`<>`代替`!=`;

2、按逻辑表达式

`&& || ! and or not`等。

```sql
select * from employees where salary > 1200 && department_id > 90;
select * from employees where salary >= 10000 && salary <= 15000;
```

推荐用 `and`， `or`， `not`。

3、模糊查询

`like; between and; in; is null; is not null`等。

```sql
select * from employees where salary between 12000 and 15000;
select * from employees where commission_pct is not null and first_name like '%Jo%';
# 匹配员工名中第三个字符为A，第五个字符为e的员工名
select last_name as lastName from employees where first_name like '__A_e%';
```

`like`和通配符搭配使用，`%`代表匹配任意个字符（0-n），`_`代表任意单个字符

转义字符：

```sql
# 直接转义
select last_name from employees where last_name like '_\_%';
# 使用escape关键字转义
select last_name from employees where last_name like '_$_%' escape '$';
```

`(not) between and`，包含左右的临界值，但是必须是左大右小。

```sql
select * from employees where job_id in ('IT_PORT', 'AD_VP', 'AD_PRES');
```

`in` 列表的内容的值类型必须一致或兼容。

```sql
select * from employees where commission_pct is null;
```

`is null` 或者 `is not null` 可以判断`NULL`，但是，`=`，`!=`，`<>`不能判断`NULL`;

```sql
select * from employees whe commission_pct <=> 12000;
```

安全等于: `<=>`，既可以判断`NULL`，又可以判断普通数值。

#### 排序 order by

`asc` 升序，`desc`降序，不写默认`asc`;

```sql
select * from employees where salary>12000 order by salary desc;
select * from employees where salary<12000 order by salary asc;
# 按年薪的高低显示员工的信息和年薪
select *, salary * 12 * (1+IFNULL(commission_pct, 0)) as year_salary from employees order by year_salary desc;
# 按函数排序
select *, salary * 12 * (1+IFNULL(commission_pct, 0)) as year_salary from employees order by LENGTH(last_name) desc;
# 多关键字排序，多个关键字之间用逗号隔开，先按工资排序，再按编号排序
select * from employees order by salary desc, employee_id asc;
```

#### 常见函数

字符串函数：

`LENGTH`：求字符串的长度。
`CONCAT`：将字符串进行连接。
`UPPER`：将字符串转大写。
`LOWER`：将字符串转小写。
`SUBSTR`：取指定位置的子字符串，
`INSTR`（和`JS`的`indexOf`类似）。
`TRIM`：消除字符串左右的空格。
`LPAD`：在字符串的左边填充指定的字符。
`RPAD`：在字符串的右边填充指定的字符。
`REPLACE`：将指定的字符替换。

注意：索引从`1`开始。

```sql
show variables like '%char%';
```

数学函数：

`ROUND`：四舍五入；
`CEIL`：向上取整；
`FLOOR`：向下取整；
`truncate`：小数点保留 N 位有效数字；
`MOD`：取余；

日期函数：

`NOW`：返回系统当前的时间；
`CURDATE`：返回系统当前的日期，不包含时分秒。
`CURTIME`：返回系统当前的时间，不包含年月日。
`YEAR`：返回系统当前的年份。
`MONTH`：返回系统当前的月份。
`MONTHNAME`：返回系统当前月份的名称，如`November`。
...
`DATE_FORMATE`：将日期转换成字符。
`STR_TO_DATE`：将字符串转换成日期。

其它函数：

`VERSION`：返回数据库的版本。
`DATABASE`：返回当前使用的数据库。
`USER`：返回当前登录的用户。

```sql
select STR_TO_DATE('9-12-1994','%m-%d-%y');
select DATE_FORMAT('2022-10-10', '%y年%m月%d日');
```

| 格式符 | 功能                                      |
| ------ | ----------------------------------------- |
| %Y     | 四位的年份                                |
| %y     | 2 位的年份                                |
| %m     | 月份, 01,02,03,04,05,06,07,08,09,10,11,12 |
| %c     | 月份, 1,2,3,4,5,6,7,8,9,10,11,12          |
| %d     | 月份, 1,2,3,4,5,6,7,8,9,10,11,12          |
| %H     | 小时，24 小时制                           |
| %h     | 小时，12 小时制                           |
| %i     | 分钟，01-59                               |
| %s     | 秒，01-59                                 |

流程控制函数：

`IFNULL`：
`IF`：`IF(exp1, exp2, exp3)`，如果`exp1`成立返回`exp2`，否则返回`exp3`。
`CASE`：

case 表达式
when 常量 1 then 值或语句 1
when 常量 2 then 值或语句 2
when 常量 3 then 值或语句 3
(else 值或语句)
end

case
when 条件 1 then 值或语句 1
when 条件 2 then 值或语句 2
when 条件 3 then 值或语句 3
(else 值或语句)
end

```sql
select salary, department_id, case department_id when 30 then salary * 1.1 when 50 then salary * 1.2 else salary end as new_salary from employees;
```

聚合函数：

`MAX`：求最大值
`MIN`：求最小值
`SUM`：求和
`AVG`：求平均值
`COUNT`：统计

`sum`和`avg`一般用于数值处理；`max`，`min`，`count`可以处理任何类型；

`sum`、`avg`、`count`、`min`、`max`都将会忽略`NULL`。

可以和`distinct`搭配，如：

```sql
select SUM(distinct salary), SUM(salary) from employees;
select COUNT(distinct salary) from employees;
```

`COUNT`函数的详细介绍，用于统计行数，如：

```sql
# 用于统计行数
select count(*) from employees;
# 或者
select count(1) from employees;
```

在`MYISAM`引擎下，`count(*)`的效率高，在`INNODB`引擎下，`COUNT(1)`和`COUNT(*)`差不多，但是要比`COUNT(字段名)`要高。

#### group by

**和分组函数一同查询的字段要求是`group by`后的字段**
伪代码如：

```text
select column, group_function(column) from xxx_table [where condition] [group by group_by_expression] [order by column];
```

例如：

```sql
select max(salary), job_id from employees group by job_id;
select count(*), location_id from departments group by location_id;
```

`where`一定在`group by`之前，`order by`一定在最后。

使用`having`关键字用于添加分组后的筛选：如查询部门员工数大于 2 的部门 id

```sql
select count(*), department_id from employees group by department_id having count(*) > 2;
```

分组查询筛选，分为两类，一是分组前筛选，使用`where`（原始表数据），一类是分组后筛选，使用`having`（分组之后的结果集），**如果是使用分组函数做条件的话，那么肯定是放在`having`子句中，能用分组前作筛选的，就优先考虑使用分组前筛选**，`group by`字句支持单个或多个字段进行分组，若采用多个字段分组，则字段之间需要使用`,`分隔，无顺序要求。

#### 连接查询

笛卡尔积的错误情况：

```sql
# 假设输出12行
select count(*) from boys;
# 假设输出4行
select count(*) from beauty;
# 最终结果 4*12行
select `name`, `boyName` from beauty, boys;
```

笛卡尔积的现象：表 1 有 m 行，表 2 有 n 行，结果 m\*n 行，是因为没有有效的连接；

<pre>
分类:
  内连接
    等值连接
    非等值连接
    自连接
  外连接
    左外连接
    右外连接
    完全链接
  交叉连接
</pre>

**等值连接：**

```sql
# 两个表的顺序可以交换
select `name`, `boyName` from beauty, boys where beauty.boyfriend_id = boys.id;
```

等值连接加上筛选，使用`and`连接。

```sql
select last_name, department_name from employees e, departments d where e.department_id = d.department_id and e.commission_pct is not null;
# 查询所有女朋友的个数大于2的男生
select boy.boyName, count(*) as stat from boys as boy, beauty as girl where girl.boyfriend_id = boy.id group by boy.boyName having stat > 2 order by stat desc;
```

多表等值连接连接的结果为多表的交集部分，多表连接的顺序没有要求，一般需要为表起别名。

**非等值连接：** 即不用等号的连接查询。

```sql
select e.salary, j.grade_level from employees as e, job_grades as j where e.salary between j.lowest_sal and j.highest_sal;
```

**自连接：**

```sql
# 查询员工和领导的名称
select e.employee_id,e.last_name,m.employee_id as parent_id,m.last_name as parent_last_name from employees as e, employees as m where e.manager_id = m.employee_id;
```

**(inner) join：** （查找两个表的并集）

```sql
select 查询列表 from 表1 inner join 表2 on 连接条件 [where 字句] [group by字句] [having字句] [order by 字句] [limit 字句]
# 查询部门人数大于10的部门名称并且按人数降序排列
SELECT d.department_name, COUNT(*) as 部门人数 from employees as e INNER JOIN departments as d on e.department_id = d.department_id GROUP BY d.department_name HAVING	部门人数 >10 ORDER BY 部门人数 DESC;
# 非等值连接
select salary,grade_level from employees as e inner join job_grades as g on e.salary between g.lowest_sal and g.highest_sal;
# 自连接
select e.last_name, m.last_name from employees as e inner join employees as m on e.employee_id = m.manager_id;
```

**outer join:**

应用场景一般用于查找一个表中有，另外一个表中没有的情况，外连接的查询结果为主表中的所有记录，如果从表中有和它匹配的记录，则填充，否则填充`NULL`。
外连接查询结果=内连接结果+主表中有但从表中没有的记录。
_全外连接=内连接的结果+表 1 中有但表 2 中没有的结果+表 2 中有的结果但表 1 中没有的结果（即求两表的并集）_

**left outer join:** 左边的是主表，右边的是从表
**right outer join:** 左边的是从表，右边的主表

左外连接和右外连接交换两个表的顺序，可以实现同样的效果。

```sql
# 查找没有男朋友的女生列表
# 最好选从表中的主键列作为筛选，因为主键列一般都是非空字段
select girl.name, girl.borndate from beauty as girl left outer join boys as boy on girl.boyfriend_id = boy.id where boy.id is null;
```

**交叉链接：** 即笛卡尔乘积

```sql
select b.*, g.* from beauty as g cross join boys as b;
# 等价于
select g.*, b.* from beauty as g, boys as b;
```

#### 子查询

出现在其它语句中的 select 语句。
子查询先于主查询。

```sql
# 查询工资比`Abel`高的人
select * from employees where salary > (
  select salary from employees where last_name = 'Abel'
);
# 子查询中使用分组函数
select last_name, job_id, salary from employees where salary = (select min(salary) from employees);
# 和`having`字句一起使用 查询最低工资大于50号部门最低工资的部门id和其最低工资
select department_id, min(salary) from employees group by department_id having min(salary) > (select min(salary) from employees where department_id = 50);
```

## DML 语言

## DDL 语言
