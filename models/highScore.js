const db = require('../controllers/mongo.js');
var collection = db.collection('highScore');

module.exports.insert = (query, callback) => {
	collection.insert( query, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};

module.exports.findTop10Scores = (callback) => {
	// removeds _id and gameId fields recursively. sorts by score. highest first. and only 10 documents
	collection.find({}, { _id: 0, gameId: 0}).sort({score: -1}).limit(10, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};