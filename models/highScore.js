const db = require('../controllers/mongo.js');
var collection = db.collection('highScore');

module.exports.insert = (query) => new Promise( (resolve, reject) => {
	collection.insert( query, (err, doc) => {
		if(err){ reject(err); }
		else{ resolve(doc); } 
	});
});

module.exports.findTop10Scores = () => new Promise( (resolve, reject) => {
	const query = { _id: 0, gameId: 0 }; // items will be removed from query
	collection.find( {}, query ).sort({score: -1}).limit(10, (err, doc) => {
		if(err){ reject(err); }
		if(doc){ resolve(doc); } 
	});
});