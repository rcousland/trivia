const db = require('../controllers/mongo.js');
const collection = db.collection('games');

const mongoErr = {'Error':'Mongo Error'};

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
module.exports.findAndModify = (query, callback) => {
	collection.findAndModify( query, (err, doc) => {
		if(err) { return callback(mongoErr,null);}
		else { return callback(null,doc);}
	});
};