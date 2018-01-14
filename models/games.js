const db = require('../controllers/mongo.js');
const collection = db.collection('games');

module.exports.findOne = (query, callback) => {
	collection.findOne( query, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};
module.exports.insert = (newDoc, callback) => {
	collection.insert( newDoc, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};
module.exports.update = (query, newDoc, callback) => {
	// update game with users questions and answers
};