function sum(a, b, cb) {
    if (a < 0 || b < 0) {
        return process.nextTick(() => cb(new Error('a or b less than 0')));
    }

    setTimeout(() => {
        cb(null, a + b);
    }, 100);
}

sum(-1, 2, (err, result) => {
    if (err) console.error(err);
    else console.log('sum is:', result);
});

console.log('run');