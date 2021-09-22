module.exports = createNewTable = (rest_uuid, instance_uuid) => {
    return {
        id: instance_uuid,
        restaurant: rest_uuid,
        tableNumber,
        users: {},
        usersIds: [],
        dishes: [],
    }
}