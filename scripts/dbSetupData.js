const mongodb = require('mongodb');
const m = require('../config/mongo.js');
const errorHandler = require('../controllers/errorHandler.js')

testData();
async function testData() {
	try{
		const data = [
			{ questionId: 1, question: 'How many seconds are there in 2 minutes?', answer: 'o4', o1:'360', o2:'420', o3:'480', o4:'120' },
			{ questionId: 2, question: 'Who directed the 1983 film \'ET the Extra-Terrestrial\'?', answer: 'o3', o1:'Drew Barrymore', o2:'Robin Williams', o3:'Steven Spielberg', o4:'Tom Hanks' },
			{ questionId: 3, question: 'Which two colours make purple?', answer: 'o3', o1:'Blue and Yellow', o2:'Green and Orange', o3:'Red and Blue', o4:'Red and Green' },
			{ questionId: 4, question: 'What is the square root of 9?', answer: 'o2', o1:'1', o2:'3', o3:'27', o4:'81' },
			{ questionId: 5, question: 'Which Italian city has a famous leaning tower?', answer: 'o2', o1:'Florence', o2:'Pisa', o3:'Rome', o4:'Venice' },
			{ questionId: 6, question: 'Which 1990s sitcom, set in California, starred comic actor Will Smith?', answer: 'o2', o1:'Cheers', o2:'Fresh Prince Of Bel-Air', o3:'Mork And Mindy', o4:'The Golden Girls' }
		]
		const db = await mongodb.MongoClient.connect(m.url);
		const dbo = db.db(m.dbName);
		await dbo.createCollection('games');
		await dbo.createCollection('questionsAndAnswers');
		await dbo.createCollection('highScore');
		const insert = await dbo.collection('questionsAndAnswers').insertMany(data);
			if(!insert) throw 'Data did not insert';
		console.log('DB Setup correctly!!! \nData Inserted correctly!!!');	
		db.close();
	}
	catch(err){
		errorHandler(err)
	}
}