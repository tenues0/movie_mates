const io = require('socket.io')(3000, {
    cors: {
       origin: ['http://localhost:8080'],
    },
})

const userIo = io.of('/user');
userIo.on('connection', socket => {
  console.log('connected to user namespace with username: ' + socket.username)
});

// setting up middleware for specific users with specific credentials
// every middleware will take a socket and next function
// next will be the next Middleware
// we want to use authentication information
userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUserNameFromToken(socket.handshake.auth.token);
    next()
  } else {
    next(new Error("Please send token"));
  }
});

function getUserNameFromToken(token) {
  return token;
}


io.on('connection', socket => {
    console.log(socket.id);
    socket.on('custom-event', (number, string) => {
        console.log(number, string);
    })

    socket.on('send-message', (message, room) => {
      // if the room is empty, then broadcast the message
      if (room === '') {
      // will send message to all of the clients,
      // except the one that we currently are
      socket.broadcast.emit('receive-message', message);
      console.log(message);
      } else {
        // else, send the message to a specific room
        socket.to(room).emit('receive-message', message);
      }
    })
    // listens for a custom room
    socket.on('join-room', (room, cb) => {
      socket.join(room);
      // tells the user what room they joined
      // a callback function
      cb(`Joined ${room}`);
    })
});
