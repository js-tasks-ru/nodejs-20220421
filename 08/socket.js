const { on } = require('events');
const { emit } = require('process');
const socketIO = require('socket.io');
const socketRedis = require('socket.io-redis');
const config = require('./config');
// const Message = require('./models/Message');

function socket(server) {
  const io = socketIO(server);

  io.adapter(socketRedis(config.redis.url));

  io.use((socket, next) => {
    // socket
    // const headers = socket.handshake.headers;

    next();
  });

  io.on('connection', socket => {

    socket.emit('lala', (a) => {
      console.log('this callback has been called by the client', a);
    });

    // io.emit() - all
    // socket.broadcast() - all, except current

    socket.on('client_user_typing', (isTyping) => {
      console.log('client_user_typing', isTyping);
      socket.broadcast.emit('server_user_typing', isTyping);
    });

    socket.on('client_user_message', message => {
      console.log('client_user_message', message);
      socket.broadcast.emit('server_user_message', message);
      
      // Message.create({
      //   text: message,
      // });
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

  });
}

module.exports = socket;
