module.exports = (db) => {
    db.on('error', (err) => {
        console.log('database error', err)
    })
    db.on('connect', () => {
        console.log('database connected')
    })
    db.on('close', () => {
        console.log('database disconnected')
    })
}