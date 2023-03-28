abstract class Engineer {
  abstract work(msg: string): void;
}

class WebFrontEndEngineer extends Engineer {
  work(msg: string): void {
    console.log("我写JS代码");
    console.log(msg);
  }
}

class WebBackEndEngineer extends Engineer {
  work(msg: string): void {
    console.log("我写Java代码");
    console.log(msg);
  }
}

class AndroidEngineer extends Engineer {
  work(msg: string): void {
    console.log("我写kotlin代码");
    console.log(msg);
  }
}

type EngineerType = "web-fe" | "web-be" | "android";

function hireEngineer(type: EngineerType): Engineer {
  let engineer: Engineer;
  switch (type) {
    case "web-fe":
      engineer = new WebFrontEndEngineer();
      break;
    case "web-be":
      engineer = new WebBackEndEngineer();
      break;
    case "android":
      engineer = new AndroidEngineer();
      break;
    default:
      engineer = new AndroidEngineer();
      break;
  }
  return engineer;
}
// 每类工厂可以生产同一个类产品下的多种产品
const engineer: Engineer = hireEngineer("android");

engineer.work("迪杰斯特拉算法");
