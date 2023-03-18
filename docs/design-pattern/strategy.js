var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SalaryStrategy = /** @class */ (function () {
    function SalaryStrategy() {
    }
    return SalaryStrategy;
}());
var CustomerServiceSalaryStrategy = /** @class */ (function (_super) {
    __extends(CustomerServiceSalaryStrategy, _super);
    function CustomerServiceSalaryStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomerServiceSalaryStrategy.prototype.calc = function () {
        console.log("客服的工资跟他接待的客诉量有一定的关系，基础工资+绩效奖金");
    };
    return CustomerServiceSalaryStrategy;
}(SalaryStrategy));
var MarketingSpecialistSalaryStrategy = /** @class */ (function (_super) {
    __extends(MarketingSpecialistSalaryStrategy, _super);
    function MarketingSpecialistSalaryStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarketingSpecialistSalaryStrategy.prototype.calc = function () {
        console.log("销售的工资跟他卖出的产品有一定的关系，除此之外，卖出一件东西，公司还会给予他额外的提成，基础工资+绩效奖金+销售提成");
    };
    return MarketingSpecialistSalaryStrategy;
}(SalaryStrategy));
var DeveloperSalaryStrategy = /** @class */ (function (_super) {
    __extends(DeveloperSalaryStrategy, _super);
    function DeveloperSalaryStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeveloperSalaryStrategy.prototype.calc = function () {
        console.log("研发人员的工资是固定的工资，如果本月研发绩效不达标，会有扣款，固定工资-本月扣款");
    };
    return DeveloperSalaryStrategy;
}(SalaryStrategy));
var NormalSalaryStrategy = /** @class */ (function (_super) {
    __extends(NormalSalaryStrategy, _super);
    function NormalSalaryStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NormalSalaryStrategy.prototype.calc = function () {
        console.log("没有额外的要求，正常发薪即可");
    };
    return NormalSalaryStrategy;
}(SalaryStrategy));
/**
 * 根据员工角色获取计薪方式
 * @param role 员工角色
 * @returns
 */
function getSalaryCalculator(role) {
    var stg;
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
var Employee = /** @class */ (function () {
    function Employee(role) {
        this.role = role;
    }
    return Employee;
}());
var Accountant = /** @class */ (function (_super) {
    __extends(Accountant, _super);
    function Accountant() {
        var _this = _super.call(this, "财务") || this;
        _this.employeeList = [];
        _this.addEmployee(_this);
        return _this;
    }
    Accountant.prototype.addEmployee = function (employee) {
        this.employeeList.push(employee);
    };
    Accountant.prototype.distributeSalary = function () {
        console.log("~~~~~~~~~~~~~~~~开始发薪~~~~~~~~~~~~~~~");
        this.employeeList.forEach(function (em) {
            var salaryStrategy = getSalaryCalculator(em.role);
            salaryStrategy.calc();
        });
        console.log("~~~~~~~~~~~~~~本月工资已全数发放，如有问题请联系公司财务~~~~~~~~~~~");
    };
    return Accountant;
}(Employee));
function bootstrap() {
    var xiaoming = new Employee("研发");
    var xiaohong = new Employee("销售");
    var xiaogang = new Employee("客服");
    var andi = new Accountant();
    andi.addEmployee(xiaogang);
    andi.addEmployee(xiaohong);
    andi.addEmployee(xiaoming);
    andi.distributeSalary();
}
