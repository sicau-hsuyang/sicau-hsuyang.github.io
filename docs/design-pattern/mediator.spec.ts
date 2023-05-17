import {
  ProjectManager,
  UIDesigner,
  WebBEDeveloper,
  WebFEDeveloper,
} from "./mediator";

describe("mediator pattern test", () => {
  it("program development mode", (done) => {
    const zmh = new ProjectManager();
    const yx = new WebFEDeveloper();
    const yz = new UIDesigner();
    const lj = new WebBEDeveloper();
    yz.setMediator(zmh);
    yx.setMediator(zmh);
    lj.setMediator(zmh);
    yz.finishWork();
    lj.startWork();
    yx.finishWork().then(done);
  });
});
