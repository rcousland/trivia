const db = require('../controllers/mongo.js');
var collection = db.collection('questionsAndAnswers');

module.exports.findOne = (query, callback) => {
	collection.findOne( query, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};
module.exports.find = (query, callback) => {
	collection.findOne( query, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};