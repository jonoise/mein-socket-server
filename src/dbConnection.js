module.exports = (NodeCache) => {
    let kitchens = {}
    let tables = {}
    const db = new NodeCache();
    db.set("kitchens", kitchens)
    db.set("tables", tables)
    return db
}