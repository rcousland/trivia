const db = require('../controllers/mongo.js');
const collection = db.collection('games');

const mongoErr = {'Error':'Mongo Error'};

module.exports.findOne = (query, callback) => {
	collection.findOne( query, (err, doc) => {
		if(err) { return callback(mongoErr,null);}
		else{ return callback(null,doc);}
	});
};
module.exports.insert = (newDoc, callback) => {
	collection.insert( newDoc, (err, doc) => {
		if(err) { return callback(mongoErr,null);}
		else{ return callback(null,doc);}
	});
};
module.exports.findAndModify = (query, callback) => {
	collection.findAndModify( query, (err, doc) => {
		if(err) { return callback(mongoErr,null);}
		else { return callback(null,doc);}
	});
};