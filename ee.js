const http = require('http');
const events = require('events');

async function main() {
  const server = new http.Server();
  server.listen(3000);
  
  for await (const [req, res] of events.on(server, 'request')) {
    res.end('hello world');
  }
}

main();
