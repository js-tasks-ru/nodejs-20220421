const fs = require('fs');
const zlib = require('zlib');
const stream = require('stream');

const gzip = zlib.createGzip();

gzip.write('lalalalalalalalalalalalalalalalalalalalalalalalala');

gzip.on('data', chunk => {
    console.log(chunk);
});

// stream.pipeline(
//     fs.createReadStream('ipsum.txt'),
//     transform,
//     fs.createWriteStream('ipsum.txt.gz'),
//     (error) => {
//         if (error) console.log('error', error);
//         else console.log('done');
//     }
// );
