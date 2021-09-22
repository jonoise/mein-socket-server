module.exports = (io, socket, db) => {
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
}