import http  from 'http';
import handler from './handler.js';

const server = new http.Server();

server.on('request', handler);

server.listen(3000);
