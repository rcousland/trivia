const db = require('../controllers/mongo.js');
var collection = db.collection('users');

module.exports.insert = (query, callback) => {
	collection.insert( newDoc, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};

module.exports.usersFind = (query, callback) => {
	collection.findOne( query, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};