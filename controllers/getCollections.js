const mongodb = require('mongodb');
const m = require('../config/mongo.js');

module.exports = async function(){
	const db = await mongodb.MongoClient.connect(m.url, m.options);
	const dbo = db.db(m.dbName);       
	return {
		games: dbo.collection('games'),
		questionsAndAnswers: dbo.collection('questionsAndAnswers'),
		highScore: dbo.collection('highScore'),
		db: db
	};
};