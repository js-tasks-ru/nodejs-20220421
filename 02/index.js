/**
 * Readable
 * Writable
 * Duplex
 * Transform
 */

const fs = require('fs');

const fileStream = fs.createReadStream('text.txt', {
    highWaterMark: 7,
    // encoding: 'utf-8',
});

const body = [];
fileStream.on('data', chunk => {
    console.log('chunk', chunk);
    // str += chunk;
    body.push(chunk);
});

fileStream.on('end', () => {
    // console.log('end', str);
    // console.log(Buffer.byteLength(Buffer.concat(body)));
    // console.log(Buffer.concat(body).toString('utf-8'));
    const buff = Buffer.concat(body);

    // console.log('.length', buff.length);
    // console.log('Buffer.byteLength', Buffer.byteLength(buff));

    const str = '👨‍👨‍👧‍👧';
    console.log('.length', str.length);
    console.log('buff.length', Buffer.from(str).length);
    console.log('Buffer.byteLength', Buffer.byteLength(Buffer.from(str)));
});
