// abstract class Observer {
//   abstract update(): void;
// }

// abstract class Subject {
//   private observers: Observer[] = [];

//   attach(observer: Observer) {
//     this.observers.push(observer);
//   }

//   detach(observer: Observer) {
//     const idx = this.observers.findIndex((ob) => ob === observer);
//     idx >= 0 && this.observers.splice(idx, 1);
//   }

//   notify() {
//     this.observers.forEach((ob) => {
//       ob.update();
//     });
//   }
// }

// class ConcreteObserver extends Observer {
//   name: string;

//   observeState: string;

//   subject: ConcreteSubject;

//   setSubject(subject: ConcreteSubject) {
//     this.subject = subject;
//   }

//   update(): void {
//     this.observeState = this.subject.subjectState;
//     console.log(`观察者${name}的新状态是${this.observeState}`);
//   }
// }

// class ConcreteSubject extends Subject {
//   private _subjectState: string;

//   get subjectState() {
//     return this._subjectState;
//   }

//   set subjectState(val: string) {
//     this._subjectState = val;
//   }
// }

// const sub = new ConcreteSubject();

// const obTom = new ConcreteObserver();

// const obJohn = new ConcreteObserver();

// obTom.setSubject(sub);

// obJohn.setSubject(sub);

// sub.attach(obTom);

// sub.attach(obJohn);

// sub.subjectState = "happy";

// sub.notify();

// sub.subjectState = "blue";

// sub.notify();

// abstract class Observer {
//   abstract update(): void;
// }

// abstract class Subject {
//   private observers: Observer[] = [];

//   attach(observer: Observer) {
//     this.observers.push(observer);
//   }

//   detach(observer: Observer) {
//     const idx = this.observers.findIndex((ob) => ob === observer);
//     idx >= 0 && this.observers.splice(idx, 1);
//   }

//   notify() {
//     this.observers.forEach((ob) => {
//       ob.update();
//     });
//   }
// }

// class ConcreteObserver extends Observer {
//   name: string;

//   observeState: string;

//   update(): void {
//     console.log("您有新的订单，请及时处理");
//   }
// }

// class ConcreteSubject extends Subject {
//   private _subjectState: string;

//   get subjectState() {
//     return this._subjectState;
//   }

//   set subjectState(val: string) {
//     this._subjectState = val;
//   }
// }

// const sub = new ConcreteSubject();
// const obTom = new ConcreteObserver();
// const obJohn = new ConcreteObserver();
// sub.attach(obTom);
// sub.attach(obJohn);
// sub.notify();

abstract class Observer {
  name: string;
  abstract update(msg: string): void;
}

abstract class Subject {
  private observers: Map<string, Set<Observer>> = new Map();

  attach(channel: string, observer: Observer) {
    let obs = this.observers.get(channel);
    if (!obs) {
      obs = new Set();
    }
    obs.add(observer);
    this.observers.set(channel, obs);
  }

  detach(channel: string, observer: Observer) {
    let obs = this.observers.get(channel);
    if (!obs) {
      return;
    }
    obs.delete(observer);
  }

  notify(channel: string, msg: string) {
    const obSet = this.observers.get(channel);
    if (obSet) {
      obSet.forEach((ob) => {
        ob.update(msg);
      });
    }
  }
}

class ConcreteObserver extends Observer {
  name: string;

  observeState: string;

  update(msg: string): void {
    console.log(msg, this.name);
  }
}

class ConcreteSubject extends Subject {
  private _subjectState: string;

  get subjectState() {
    return this._subjectState;
  }

  set subjectState(val: string) {
    this._subjectState = val;
  }
}

const sub = new ConcreteSubject();
const obTom = new ConcreteObserver();
obTom.name = "tom";
const obJohn = new ConcreteObserver();
obJohn.name = "john";
sub.attach("villa", obTom);
sub.attach("department", obJohn);
sub.notify("villa", "别墅降价了");
sub.notify("villa", "别墅又降价了");
sub.notify("department", "公寓涨价了，再不买，买不到了");
