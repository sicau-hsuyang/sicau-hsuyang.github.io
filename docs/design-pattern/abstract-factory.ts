abstract class User {
  abstract work(): void;
}

abstract class Department {
  abstract getSchedule(): void;
}

abstract class Factory {
  abstract createUser(): User;
  abstract createDepartment(): Department;
}

class MysqlFactory extends Factory {
  createUser(): User {
    return new MysqlUser();
  }
  createDepartment(): Department {
    return new MysqlDepartment();
  }
}

class SqlServerFactory extends Factory {
  createUser(): User {
    return new SqlServerUser();
  }

  createDepartment(): Department {
    return new SqlServerDepartment();
  }
}

class MysqlUser extends User {
  work(): void {
    console.log("使用mysql语法进行工作");
  }
}

class MysqlDepartment extends Department {
  getSchedule(): void {
    console.log("使用mysql获取部门的安排");
  }
}

class SqlServerUser extends User {
  work(): void {
    console.log("使用sql server语法进行工作");
  }
}

class SqlServerDepartment extends Department {
  getSchedule(): void {
    console.log("使用sql server获取部门的安排");
  }
}

type DbType = "MySql" | "SqlServer";

function getFactory(type: DbType): Factory {
  let factory: Factory;
  switch (type) {
    case "MySql":
      factory = new MysqlFactory();
      break;
    case "SqlServer":
      factory = new SqlServerFactory();
      break;
    default:
      factory = new MysqlFactory();
      break;
  }
  return factory;
}

const factory: Factory = getFactory("MySql");

const user = factory.createUser();

abstract class FilerSaver {
  abstract save(content: string, path: string, name: string): void;
}

class NodeFilerSaver extends FilerSaver {
  save(content: string, name: string, path: string): void {
    throw new Error("Method not implemented.");
  }
}

class BrowserFilerSaver extends FilerSaver {
  save(content: string, name: string, path: string): void {
    throw new Error("Method not implemented.");
  }
}

abstract class FileSaverFactory {
  abstract create(): FilerSaver;
}

class NodeFileSaverFactory extends FileSaverFactory {
  create(): FilerSaver {
    return new NodeFilerSaver();
  }
}

class BrowserFileSaverFactory extends FileSaverFactory {
  create(): FilerSaver {
    return new BrowserFilerSaver();
  }
}
