const mongojs = require('mongojs');
const mongoUrl = require('../config/mongo.js').url();

// Connect to mongo DB and set events
const db = mongojs( mongoUrl );
require('./mongo.js')(db);

var userCollection = db.collection('users'),
	qaCollection = db.collection('questionsAndAnswers'),
	gamesCollection = db.collection('games');


module.exports = {
	gameIdFind: (gameId) => {
		gamesCollection.findOne( gameId, (err, docs) => {
			if(err)throw new Error(err);
            
			else{
				return (docs);
			}
		});
	},
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
