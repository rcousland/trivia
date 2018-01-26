const mongojs = require('mongojs');
const m = require('../config/mongo.js');

// Connect to mongo DB and set events
const db = mongojs( m.url() , [] , m.options );

db.on('error', (err) => {
	console.log('database error', err);
});
db.on('connect', () => {
	console.log('database connected');
});
db.on('close', () => {
	console.log('database disconnected');
});

module.exports = db;
