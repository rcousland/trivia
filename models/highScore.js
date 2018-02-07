const db = require('../controllers/mongo.js');
var collection = db.collection('highScore');

module.exports.insert = (query, callback) => {
	collection.insert( query, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};

module.exports.findTop10Scores = () => {
	return new Promise(function(resolve, reject) {
		const query = { _id: 0, gameId: 0 }; // items will be removed from response
		collection.find( {}, query ).sort({score: -1}).limit(10, (err, doc) => {
			if(err){ reject(err); }
			if(doc){ resolve(doc); } 
		});
	});
};