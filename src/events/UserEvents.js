module.exports = (io, socket, db) => {
    socket.on("addUser", (newUser) => {
        let tables = db.get('tables')
        const table = tables[newUser.instance_uuid]
        table.users = {
            ...table.users,
            [newUser.id]: newUser
        }
        table.usersIds.push(newUser.id)

        db.set("tables", {
            ...tables,
            [table.id]: table
        })

        socket.broadcast.to(newUser.instance_uuid).emit('userAdded', table.users[newUser.id])
    })

    socket.on("tableUsers", () => {
        let tables = db.get('tables')
        const table = tables[socket.data.instance_uuid]
        console.log(table.users)
    })

    socket.on("showTables", () => {
        let tables = db.get('tables')
        socket.broadcast.to(socket.data.instance_uuid).emit("showTables", tables)
    })

    socket.on("rename", (editUser) => {
        users = {
            ...users,
            [editUser.id]: editUser
        }
    })
}