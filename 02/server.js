const http = require('http');
const zlib = require('zlib');
const fs = require('fs');
const createReplaceStream = require('./replace');

const server = new http.Server();

server.on('request', (req, res) => {
    // req.url (?from=яблоко&to=малина)
    // const url = new URL(req.url, 'http://localhost:3000');

    // const from = url.searchParams.get('from');
    // const to = url.searchParams.get('to');

    // const rStream = createReplaceStream({ 
    //     from,
    //     to,
    //     encoding: 'utf-8' 
    // });
    // const gzip = zlib.createGzip();

    // res.setHeader('content-encoding', 'gzip');
    // req.pipe(rStream).pipe(gzip).pipe(res);

    const body = [];
    
    req.on('data', chunk => body.push(chunk));
    
    req.on('end', () => {
        try {
            const str = Buffer.concat(body).toString('utf-8');
            const obj = JSON.parse(str);

            const rStream = createReplaceStream({ 
                from: obj.from,
                to: obj.to,
                encoding: 'utf-8' 
            });

            rStream.on('data', chunk => {
                res.write(chunk);
            });

            rStream.end(obj.content);

            rStream.on('end', () => {
                res.end();
            });
        } catch (err) {
            console.log(err);
            res.statusCode = 500;
            res.end('internal error');
        }
    });
});

server.listen(3000);
