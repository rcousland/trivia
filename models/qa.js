const db = require('../controllers/mongo.js');
var collection = db.collection('questionsAndAnswers');

module.exports.findOne = (query) => new Promise( (resolve, reject) => {
	collection.findOne( query, (err, doc) => {
		if(err){ reject(err); }
		else{ resolve(doc); } 
	});
});
module.exports.find = (query, callback) => {
	collection.findOne( query, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};