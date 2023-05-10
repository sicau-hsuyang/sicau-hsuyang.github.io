## 桥接模式

### 1、基本概念

桥接模式（`Bridge Pattern`）是一种结构型设计模式，它将一个大类或一系列紧密关联的类分为抽象和实现两个独立的层次结构，从而能在它们之间更好地进行解耦。桥接模式让抽象和实现可以独立地变化，不相互影响。它通过**组合来代替继承**，以实现多个变化的维度。

我个人对桥接模式的理解就像木匠制做家具一样，分别将不同的部件准备好，然后通过钉子钉或榫卯在一起（假设某个部件觉得当前材料的强度不够，只需要按照这个规格重新用更高强度的材料做一块，再接在一起就好了。）

在桥接模式中，抽象部分定义了要执行的操作，而实现部分提供了这些操作的具体实现。

直接这样说，可能您看起来比较迷糊，举个例子，我们需要开发一个页面，页面里面有`3`个组件，需要分别适应`Web`浏览器，微信小程序，有两种思维方式：

- 1、第一种思考方式，直接写两套页面，针对不同的平台分别去写`3`个组件，每个组件仅仅负责当前对应的平台即可；
- 2、第二种思考方式，分别针对浏览器和小程序写好`3`个组件（即组件支持跨平台），然后在页面里引入这`3`个组件，组装形成需要的页面。

事实上，在现在的前端开发中，我们实际上使用的是第二种方式，为什么呢？因为第一种方式组件跟平台是耦合的，组件其实并没有被抽象出来，如果一旦页面增多，那么将会带来成倍的开发成本的增加。而采取第二种方式，我们根据页面划分组件，将组件开发好，最后再进行组装，成本低很多。

前端在不断的实践中选择的是第二种方式，这其实就是桥接模式的应用。

以下是桥接模式的`UML`图：

<div align="center">
  <img :src="$withBase('/design-pattern/bridge-pattern.png')" alt="桥接模式" />
</div>

简单的介绍一下这个`UML`图，`Abstraction`类聚合`Implementor`类（抽象部分，解耦合），`RedefinedAbstraction`实现自`Abstraction`，
不同的业务逻辑`ConcreteImplementor`实现自`Implementor`。

桥接模式体现了好几个原则：`单一职责原则`，`开闭原则`，`合成/聚合复用原则`，因为`Abstraction`聚合了`Implementor`，因此`Abstraction`可以不用再去继承什么了，避免了一个复杂软件系统里面可能出现的继承链问题；

同时，`Abstraction`和`Implementor`分别封装了自己的功能，使得代码的职责更加单一；

另外，由于具体的实现都是通过不同的业务类去实现对应的`Abstraction`和`Implementor`，如果面对业务扩展的时候，可以从容的增加新的实现子类避免了去修改已经存在的代码。

### 2、代码范式

```ts
// 定义实现类
interface ChartImpl {
  drawAxes(): void
  drawData(data: any[]): void
}

class SVGChartImpl implements ChartImpl {
  drawAxes() {
    // 在 SVG 中绘制坐标轴
  }
  drawData(data: any[]) {
    // 在 SVG 中绘制数据
  }
}

class CanvasChartImpl implements ChartImpl {
  drawAxes() {
    // 在 canvas 中绘制坐标轴
  }
  drawData(data: any[]) {
    // 在 canvas 中绘制数据
  }
}

// 定义抽象类
abstract class Chart {
  protected impl: ChartImpl
  constructor(impl: ChartImpl) {
    this.impl = impl
  }
  abstract draw(): void
}

// 定义具体的图表类型
class LineChart extends Chart {
  draw() {
    this.impl.drawAxes()
    this.impl.drawData([...])
    // 绘制折线图特有的元素
  }
}

class BarChart extends Chart {
  draw() {
    this.impl.drawAxes()
    this.impl.drawData([...])
    // 绘制柱状图特有的元素
  }
}

// 使用示例
// const impl = new SVGChartImpl()
const impl = new CanvasChartImpl();
const lineChart = new LineChart(impl)
const barChart = new BarChart(impl)

lineChart.draw()
barChart.draw()

```

从我的实际开发经验来说，桥接模式理解起来简单，但是怎样抽象的过程并不简单，在实际开发中需要我们选择正确的维度。

### 3、在前端开发中的实践

桥接模式在前端的业务代码开发中更多的体现的是一些设计思想，不怎么常用。

但是如果您是开发一些库，那么这绝对是一个改善您的工程质量的设计模式。

还是拿`typeorm`这个库举例子，下面是我从它的实现中摘取的一些代码（代码中有有删减，有兴趣的读者可以直接查看源代码库）：

`QueryRunner`的定义与具体实现：

```ts
export interface QueryRunner {
  /**
   * Connection used by this query runner.
   */
  readonly connection: DataSource;

  /**
   * Executes a given SQL query and returns raw database results.
   */
  query(
    query: string,
    parameters: any[] | undefined,
    useStructuredResult: true
  ): Promise<QueryResult>;
}

/**
 * Runs queries on a single mysql database connection.
 */
export class MysqlQueryRunner extends BaseQueryRunner implements QueryRunner {
  /**
   * Database driver used by connection.
   */
  driver: MysqlDriver;

  constructor(driver: MysqlDriver, mode: ReplicationMode) {
    super();
    this.driver = driver;
  }

  /**
   * Executes a raw SQL query.
   */
  async query(
    query: string,
    parameters?: any[],
    useStructuredResult = false
  ): Promise<any> {
    // 省略MySQL的实现
  }
}

/**
 * Runs queries on a single SQL Server database connection.
 */
export class SqlServerQueryRunner
  extends BaseQueryRunner
  implements QueryRunner
{
  /**
   * Database driver used by connection.
   */
  driver: SqlServerDriver;

  constructor(driver: SqlServerDriver, mode: ReplicationMode) {
    super();
    this.driver = driver;
  }

  /**
   * Executes a raw SQL query.
   */
  async query(
    query: string,
    parameters?: any[],
    useStructuredResult = false
  ): Promise<any> {
    // 省略SqlServer的实现
  }
}
```

`Driver`的定义与具体实现：

```ts
/**
 * Driver organizes TypeORM communication with specific database management system.
 */
export interface Driver {
  /**
   * Creates a query runner used for common queries.
   */
  createQueryRunner(mode: ReplicationMode): QueryRunner;
}

/**
 * Organizes communication with MySQL DBMS.
 */
export class MysqlDriver implements Driver {
  /**
   * Connection used by driver.
   */
  connection: DataSource;

  constructor(connection: DataSource) {
    this.connection = connection;
  }

  /**
   * Creates a query runner used to execute database queries.
   */
  createQueryRunner(mode: ReplicationMode) {
    return new MysqlQueryRunner(this, mode);
  }
}

/**
 * Organizes communication with SQL Server DBMS.
 */
export class SqlServerDriver implements Driver {
  /**
   * Connection used by driver.
   */
  connection: DataSource;

  constructor(connection: DataSource) {
    this.connection = connection;
  }

  /**
   * Creates a query runner used to execute database queries.
   */
  createQueryRunner(mode: ReplicationMode) {
    return new MysqlQueryRunner(this, mode);
  }
}
```

最后是`DataSource`的实现：

```ts
/**
 * Helps to create drivers.
 */
export class DriverFactory {
  /**
   * Creates a new driver depend on a given connection's driver type.
   */
  create(connection: DataSource): Driver {
    const { type } = connection.options;
    switch (type) {
      case "mysql":
        return new MysqlDriver(connection);
      case "mssql":
        return new SqlServerDriver(connection);
      default:
        throw new MissingDriverError(type, ["mssql", "mysql"]);
    }
  }
}

/**
 * DataSource is a pre-defined connection configuration to a specific database.
 */
export class DataSource {
  /**
   * Database driver used by this connection.
   */
  driver: Driver;

  constructor(options: DataSourceOptions) {
    this.driver = new DriverFactory().create(this);
  }
}
```

进过这个设计，虽然不同的数据库其对`SQL`实现标准不同，但`MysqlQueryRunner`或`SqlServerQueryRunner`根据其所实现的数据库平台各自处理，将来如果`MySQL`或`SQL Server`有升级，仅仅需要修改自身的内部实现，彼此互不影响。

若将来有新的数据库需要支持，只需要再新增某个`QueryRunner`就可以了，几乎不需要多系统的代码进行过多的修改。
