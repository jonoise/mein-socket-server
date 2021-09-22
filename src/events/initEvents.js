module.exports = (io, socket, db) => {
    // DB MODELS

    // INIT TABLE HANDLER
    const initTable = (rest_uuid, instance_uuid, tableNumber) => {
        let tables = db.get("tables")

        socket.data.instance_uuid = instance_uuid
        socket.join(instance_uuid)

        let existingTable = tables[instance_uuid]
        if (!existingTable) {
            // TABLE OBJECT
            const newTable = {
                id: instance_uuid,
                restaurant: rest_uuid,
                tableNumber,
                users: {},
                usersIds: [],
                dishes: [],
            }

            tables[instance_uuid] = newTable
            db.set("tables", tables)
            existingTable = newTable
        }
        socket.emit("addUserId", socket.id)
    }

    // HYDRATE TABLE HANDLER
    const hydrateState = () => {
        let tables = db.get("tables")
        const table = tables[socket.data.instance_uuid]
        socket.emit("init:hydration", table)
    }

    // DISCONNECT HANDLER
    const disconnect = () => {
        let tables = db.get("tables")
        const table = tables[socket.data.instance_uuid]
        if (table) {


            table.usersIds = table.usersIds.filter(id => id !== socket.id)
            delete table.users[socket.id]
            db.set("tables", {
                ...tables,
                [table.id]: table
            })
        }
    }

    socket.on("init:table", initTable);
    socket.on("init:hydration", hydrateState);
    socket.on("disconnect", disconnect)
}