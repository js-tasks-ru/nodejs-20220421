const http = require('http');
const uuid = require('uuid/v4');
const fs = require('fs/promises');

const server = new http.Server();

server.on('request', async (req, res) => {
    switch (req.url) {
        case '/':
            res.end('hello world');
            break;
        case '/calculate':
            const body = [];

            for await (const chunk of req) {
                body.push(chunk);
            }

            const { a, b } = JSON.parse(Buffer.concat(body).toString('utf-8'));
            const sum = a + b;

            const filename = `${uuid()}.txt`;

            await fs.writeFile(filename, sum.toString());

            res.end(filename);

            break;
        default:
            res.statusCode = 404;
            res.end('not found');
    }
});

module.exports = server;