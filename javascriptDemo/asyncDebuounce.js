function asyncDebounce(func, wait) {
  const debounced = _.debounce((resolve, reject, args) => {
    func(...args).then(resolve).catch(reject);
  }, wait);
  return (...args) =>
    new Promise((resolve, reject) => {
      debounced(resolve, reject, args);
    });
}