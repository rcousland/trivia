const db = require('../controllers/mongo.js');
const collection = db.collection('games');

const mongoErr = {'Error':'Mongo Error'};

//result = await model.games.findOne( query )

module.exports.findOne = (query) => {
	return new Promise(function(resolve, reject) {
		collection.findOne( query, (err, doc) => {
			if(err){ reject(err); }
			else{ resolve(doc); } 
		});
	});
};
module.exports.insert = (newDoc) => {
	return new Promise(function(resolve, reject) {
		collection.insert( newDoc, (err, doc) => {
			if(err){ reject(err); }
			else{ resolve(doc); } 
		});
	});
};
module.exports.findAndModify = (query, callback) => {
	collection.findAndModify( query, (err, doc) => {
		if(err) { return callback(mongoErr,null);}
		else { return callback(null,doc);}
	});
};