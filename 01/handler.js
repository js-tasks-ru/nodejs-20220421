let i = 0;

const obj = {};

function handler(req, res) {
    i++;

    obj[Math.random()] = '*'.repeat(100000).split('');

    res.end(i.toString());
}

module.exports = handler;