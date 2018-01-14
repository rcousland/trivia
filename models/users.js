const db = require('../controllers/mongo.js');
var collection = db.collection('users');

// Users collection ================================================
// Insert Users name
module.exports.insert = (query, callback) => {
	collection.insert( newDoc, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};

// get highscore list. top 10
module.exports.usersFind = (query, callback) => {
	collection.findOne( query, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};