function promisify(fn) {
  return function() {
    return new Promise((resolve, reject) => {
      fn(...arguments, (err, ) => {

      })
    })
  }
}