Array.prototype.update = function () {
  this.sort((a, b) => {
    return a - b;
  });
  let k = 0;
  let p = k + 1;
  while (p < this.length) {
    if (this[p] === this[k]) {
      p++;
    } else {
      this[k + 1] = this[p];
      k = p;
      p++;
    }
  }
  while (this.length - 1 >= k) {
    this.pop();
  }
};

let arr = [1, 2, 3, 3, 4];
arr.update();
console.log(arr); //[1,2,3,4]
