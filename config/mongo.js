module.exports = {
    host: 'localhost',
    port: 27017,
    db: 'test',
    url: () => {
        return this.host + ":" + this.port + "/" + this.db
    }
}