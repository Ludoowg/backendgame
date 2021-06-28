//Dependencies
const dotenv = require('dotenv')
dotenv.config()
const app = require('express')()
const server = require('http').createServer(app)

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH"],
        // allowedHeaders: ["my-custom-header"],
    },

});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

io.on('connection', socket => {
   console.log('user connected')
});
io.on("connection", (socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.username,
      });
    }
    console.log(users)
    socket.emit("users", users);
    // ...
  });

  io.on("connection", (socket) => {
    // notify existing users
    socket.broadcast.emit("user connected", {
      userID: socket.id,
      username: socket.username,
    });
    console.log(socket.id, socket.username)

  });

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`))

