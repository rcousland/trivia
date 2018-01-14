const mongojs = require('mongojs');
const mongoUrl = require('../config/mongo.js').url();

// Connect to mongo DB and set events
const db = mongojs( mongoUrl );
require('./mongo.js')(db);

var gamesCollection = db.collection('games');
// userCollection = db.collection('users'),
// qaCollection = db.collection('questionsAndAnswers');


module.exports.gamesFindOne = (query, callback) => {
	gamesCollection.findOne( query, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};

module.exports.gamesInsert = (newDoc, callback) => {
	gamesCollection.insert( newDoc, (err, doc) => {
		if(err) { return callback(err,null);}
		else{ return callback(null,doc);}
	});
};





// // find all
// testData.find( (err, docs) => {
//     if(err)throw new Error(err)
//     console.log('DOCS',docs)
//     res.send(docs)
// })


// // insert
// var name = req.body.name
// testData.insert({name: name})
// res.send(name)
