const mongojs = require('mongojs');
const mongoUrl = require('../config/mongo.js').url();

// Connect to mongo DB and set events
const db = mongojs( mongoUrl );

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
