require('dotenv').config()
const {
    default: axios
} = require('axios')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const API_URL = process.env.API_URL || 'http://localhost:8000/api'
const app = express()
const server = http.createServer(app)
const io = new socketio.Server(server, {
    cors: {
        origin: '*'
    }
})
const NodeCache = require("node-cache");
const initEvents = require('./events/initEvents')
const userEvents = require('./events/UserEvents')


const db = new NodeCache();
let kitchens = {}
let tables = {}

db.set("kitchens", kitchens)
db.set("tables", tables)

const onConnection = (socket) => {
    initEvents(io, socket, db)
    userEvents(io, socket, db)

    // KITCHEN EVENTS
    // @getKitchen -> retrieve a kitchen
    socket.on("getKitchen", async (kitchen_uuid) => {
        try {
            const kitchen = await axios.get(`${API_URL}/kitchens/${kitchen_uuid}`)
            console.log(kitchen)
        } catch (error) {
            console.log(error.response.data)
        }
    })

    // TEST
    socket.on("broadcastGreeting", (greeting, instance_uuid) => {
        socket.broadcast.to(instance_uuid).emit("broadcastGreeting", tables)
    })

    socket.on("disconnect", () => {
        const table = tables[socket.data.instance_uuid]
        if (table) {
            delete table.users[socket.id]
        }
    })
}

io.on('connection', onConnection)

server.listen(4000, () => console.log("LISTINING!"))