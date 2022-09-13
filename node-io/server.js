const server = require('http').createServer();
const io = require('socket.io')(server);

const PORT = process.env.PORT || 9000;

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`)

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
  })
})

server.listen(PORT)