const http = require('http');

const server = new http.Server();

//                3s     3s   3s
// tasks queue: [req1, req2, req3]

server.on('request', (req, res) => {
    // const now = Date.now();
    // while(Date.now() < now + 3000) {}

    // setTimeout(() => {
        res.end('hello world');
    // }, 3000);
});

server.listen(3000);
