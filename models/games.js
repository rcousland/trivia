const db = require('../controllers/mongo.js');
const collection = db.collection('games');

module.exports.findOne = (query) => new Promise( (resolve, reject) => {
	collection.findOne( query, (err, doc) => {
		if(err){ reject(err); }
		else{ resolve(doc); } 
	});
});

module.exports.insert = (newDoc) => new Promise( (resolve, reject) => {
	collection.insert( newDoc, (err, doc) => {
		if(err){ reject(err); }
		else{ resolve(doc); } 
	});
});

module.exports.findAndModify = (query) => new Promise( (resolve, reject) => {
	collection.findAndModify( query, (err, doc) => {
		if(err){ reject(err); }
		else{ resolve(doc); } 
	});
});