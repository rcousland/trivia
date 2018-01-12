module.exports.express = {
    host: 'localhost',
    port: 3000
}

module.exports.mongo = {
    host: 'localhost',
    port: 27017,
    db: 'test',
    url: () => {
        return this.host + "/" + this.db;
    }
}