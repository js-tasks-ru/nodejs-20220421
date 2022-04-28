const fs = require('fs');

// nexttick queue: []
// microtasks queue: []
// tasks queue: ['setTimeout']

console.log('start'); // 1

new Promise((resolve, reject) => {
  console.log('new Promise'); // 2
  resolve();
})
.then(_ => {
  console.log('then-1'); // 6
  return new Promise(resolve => {
    process.nextTick(() => {
      console.log('nextTick-3'); // 7
      resolve();
    });
  });
})
.then(_ => console.log('then-2')); // 8

fs.open(__filename, () => {
  console.log('fs.open'); // 9
  queueMicrotask(_ => {
    console.log('queueMicrotask-1'); // 10
  });
});

process.nextTick(() => {
  console.log('nextTick-1'); // 4
  process.nextTick(() => console.log('nextTick-2')); // 5

  while(true) {}
});

console.time('setTimeout');
setTimeout(() => {
  console.timeEnd('setTimeout');
  console.log('setTimeout'); // 11

}, 10);

setImmediate(() => {
  console.log('setImmediate');
});

console.log('end'); // 3
