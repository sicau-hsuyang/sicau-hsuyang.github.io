function demo() {
  var obj = {
    a: 1,
    b: 2,
  };

  return function test() {
    var b = obj;
    setTimeout(() => {
      b = null;
      obj = null;
    }, 1000);
  };
}

const fn = demo();

fn();
