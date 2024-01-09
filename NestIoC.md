工厂方法，启动独立上下文

```ts
export class NestFactoryStatic {
  // 入口方法
  public async createApplicationContext(
    moduleCls: any,
    options?: NestApplicationContextOptions
  ): Promise<INestApplicationContext> {
    const applicationConfig = new ApplicationConfig();
    const container = new NestContainer(applicationConfig);
    const graphInspector = this.createGraphInspector(options, container);

    this.setAbortOnError(options);
    this.registerLoggerConfiguration(options);

    await this.initialize(
      moduleCls,
      container,
      graphInspector,
      applicationConfig,
      options
    );

    const modules = container.getModules().values();
    const root = modules.next().value;

    const context = this.createNestInstance<NestApplicationContext>(
      new NestApplicationContext(container, options, root)
    );
    if (this.autoFlushLogs) {
      context.flushLogsOnOverride();
    }
    return context.init();
  }

  // 初始化入口
  private async initialize(
    module: any,
    container: NestContainer,
    graphInspector: GraphInspector,
    config = new ApplicationConfig(),
    options: NestApplicationContextOptions = {},
    httpServer: HttpServer = null
  ) {
    UuidFactory.mode = options.snapshot
      ? UuidFactoryMode.Deterministic
      : UuidFactoryMode.Random;

    const injector = new Injector({ preview: options.preview });
    const instanceLoader = new InstanceLoader(
      container,
      injector,
      graphInspector
    );
    const metadataScanner = new MetadataScanner();
    const dependenciesScanner = new DependenciesScanner(
      container,
      metadataScanner,
      graphInspector,
      config
    );
    container.setHttpAdapter(httpServer);

    const teardown = this.abortOnError === false ? rethrow : undefined;
    await httpServer?.init();
    try {
      this.logger.log(MESSAGES.APPLICATION_START);

      await ExceptionsZone.asyncRun(
        async () => {
          await dependenciesScanner.scan(module);
          await instanceLoader.createInstancesOfDependencies();
          dependenciesScanner.applyApplicationProviders();
        },
        teardown,
        this.autoFlushLogs
      );
    } catch (e) {
      this.handleInitializationError(e);
    }
  }
}
```

扫描元数据

```ts
export class DependenciesScanner {
  // 开始扫描
  public async scan(
    module: Type<any>,
    options?: { overrides?: ModuleOverride[] }
  ) {
    // 创建了一个nest内部的核心模块
    await this.registerCoreModule(options?.overrides);
    await this.scanForModules({
      moduleDefinition: module,
      overrides: options?.overrides,
    });
    // 接着扫描模块的依赖
    await this.scanModulesForDependencies();
    this.calculateModulesDistance();

    this.addScopedEnhancersMetadata();
    this.container.bindGlobalScope();
  }

  public async scanForModules({
    moduleDefinition,
    lazy,
    scope = [],
    ctxRegistry = [],
    overrides = [],
  }: ModulesScanParameters): Promise<Module[]> {
    const { moduleRef: moduleInstance, inserted: moduleInserted } =
      (await this.insertOrOverrideModule(moduleDefinition, overrides, scope)) ??
      {};

    moduleDefinition =
      this.getOverrideModuleByModule(moduleDefinition, overrides)?.newModule ??
      moduleDefinition;

    moduleDefinition =
      moduleDefinition instanceof Promise
        ? await moduleDefinition
        : moduleDefinition;

    ctxRegistry.push(moduleDefinition);

    if (this.isForwardReference(moduleDefinition)) {
      moduleDefinition = (moduleDefinition as ForwardReference).forwardRef();
    }
    // 扫描依赖的模块
    const modules = this.reflectMetadata(
      MODULE_METADATA.IMPORTS,
      moduleDefinition as Type<any>
    );

    let registeredModuleRefs = [];
    for (const [index, innerModule] of modules.entries()) {
      // In case of a circular dependency (ES module system), JavaScript will resolve the type to `undefined`.
      if (innerModule === undefined) {
        throw new UndefinedModuleException(moduleDefinition, index, scope);
      }
      if (!innerModule) {
        throw new InvalidModuleException(moduleDefinition, index, scope);
      }
      if (ctxRegistry.includes(innerModule)) {
        continue;
      }
      // 递归的扫描其它的模块
      const moduleRefs = await this.scanForModules({
        moduleDefinition: innerModule,
        scope: [].concat(scope, moduleDefinition),
        ctxRegistry,
        overrides,
        lazy,
      });
      registeredModuleRefs = registeredModuleRefs.concat(moduleRefs);
    }
    if (!moduleInstance) {
      return registeredModuleRefs;
    }

    if (lazy && moduleInserted) {
      this.container.bindGlobalsToImports(moduleInstance);
    }
    return [moduleInstance].concat(registeredModuleRefs);
  }

  public async scanModulesForDependencies(
    modules: Map<string, Module> = this.container.getModules(),
  ) {
    for (const [token, { metatype }] of modules) {
      await this.reflectImports(metatype, token, metatype.name);
      // 扫描依赖
      this.reflectProviders(metatype, token);
      this.reflectControllers(metatype, token);
      this.reflectExports(metatype, token);
    }
  }
}
```

扫描到了依赖，分析清楚了依赖关系，然后就是开始为某个路由分配对应的controller