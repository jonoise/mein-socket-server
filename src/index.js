require('dotenv').config()
const {
    default: axios
} = require('axios')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new socketio.Server(server, {
    cors: {
        origin: '*'
    }
})

const initEvents = require('./events/initEvents')
const userEvents = require('./events/UserEvents')
const testEvents = require('./events/testEvents')


const NodeCache = require("node-cache");
const dbConnection = require('./dbConnection')
const db = dbConnection(NodeCache)


const onConnection = (socket) => {
    initEvents(io, socket, db)
    userEvents(io, socket, db)
    testEvents(io, socket, db)
}

io.on('connection', onConnection)

server.listen(4000, () => console.log("LISTINING!"))