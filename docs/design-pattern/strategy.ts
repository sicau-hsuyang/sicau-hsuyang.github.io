abstract class SalaryStrategy {
  abstract calc(): void;
}

class CustomerServiceSalaryStrategy extends SalaryStrategy {
  calc(): void {
    console.log("客服的工资跟他接待的客诉量有一定的关系，基础工资+绩效奖金");
  }
}

class MarketingSpecialistSalaryStrategy extends SalaryStrategy {
  calc(): void {
    console.log(
      "销售的工资跟他卖出的产品有一定的关系，除此之外，卖出一件东西，公司还会给予他额外的提成，基础工资+绩效奖金+销售提成"
    );
  }
}

class DeveloperSalaryStrategy extends SalaryStrategy {
  calc(): void {
    console.log(
      "研发人员的工资是固定的工资，如果本月研发绩效不达标，会有扣款，固定工资-本月扣款"
    );
  }
}

class NormalSalaryStrategy extends SalaryStrategy {
  calc(): void {
    console.log("没有额外的要求，正常发薪即可");
  }
}

/**
 * 根据员工角色获取计薪方式
 * @param role 员工角色
 * @returns
 */
function getSalaryCalculator(role: string): SalaryStrategy {
  let stg: CustomerServiceSalaryStrategy;
  switch (role) {
    case "客服":
      stg = new CustomerServiceSalaryStrategy();
      break;
    case "销售":
      stg = new MarketingSpecialistSalaryStrategy();
      break;
    case "研发":
      stg = new DeveloperSalaryStrategy();
      break;
    default:
      stg = new NormalSalaryStrategy();
      break;
  }
  return stg;
}

class Employee {
  role: string;

  constructor(role: string) {
    this.role = role;
  }
}

class Accountant extends Employee {
  employeeList: Employee[] = [];

  constructor() {
    super("财务");
    this.addEmployee(this);
  }

  addEmployee(employee: Employee) {
    this.employeeList.push(employee);
  }

  distributeSalary() {
    console.log("~~~~~~~~~~~~~~~~开始发薪~~~~~~~~~~~~~~~");
    this.employeeList.forEach((em) => {
      const salaryStrategy = getSalaryCalculator(em.role);
      salaryStrategy.calc();
    });
    console.log(
      "~~~~~~~~~~~~~~本月工资已全数发放，如有问题请联系公司财务~~~~~~~~~~~"
    );
  }
}

function bootstrap() {
  const xiaoming = new Employee("研发");
  const xiaohong = new Employee("销售");
  const xiaogang = new Employee("客服");
  const andi = new Accountant();

  andi.addEmployee(xiaogang);
  andi.addEmployee(xiaohong);
  andi.addEmployee(xiaoming);

  andi.distributeSalary();
}
