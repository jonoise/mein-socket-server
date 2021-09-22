module.exports = (io, socket, db) => {
    // DB MODELS
    let tables = db.get("tables")

    // INIT TABLE HANDLER
    const initTable = (rest_uuid, instance_uuid, tableNumber) => {

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
            console.log(tables)
            db.set("tables", tables)
            existingTable = newTable
        }
        socket.emit("addUserId", socket.id)
    }

    // HYDRATE TABLE HANDLER
    const hydrateState = () => {
        socket.emit("")
    }

    socket.on("init:table", initTable);
    socket.on("init:hydration", hydrateState);
}