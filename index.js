//Dependencies
const dotenv = require('dotenv')
dotenv.config()
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" }})

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
    console.log("User connected:" + socket.id) 
 })

server.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
})

