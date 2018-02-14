const mongojs = require('mongojs');

// Connect to mongo DB and set events
const db = mongojs( 'localhost:27017/ntest' );

db.on('error', (err) => {
	console.log('database error', err);
});
db.on('connect', () => {
	console.log('database connected');
});
db.on('close', () => {
	console.log('database disconnected');
});

module.exports.insert = (query) => new Promise( (resolve, reject) => {
db.createCollection("games", (e,doc) => { })
db.createCollection("questionsAndAnswers", (e,doc) => { })
db.createCollection("highScore", (e,doc) => { })
});


//create the names collection and add documents to it
db.questionsAndAnswers.insert( [
    { questionId: 1, question: "How many seconds are there in 2 minutes?", answer: "o4", o1:"360", o2:"420", o3:"480", o4:"120" },
    { questionId: 2, question: "Who directed the 1983 film 'ET the Extra-Terrestrial'?", answer: "o3", o1:"Drew Barrymore", o2:"Robin Williams", o3:"Steven Spielberg", o4:"Tom Hanks" },
    { questionId: 3, question: "Which two colours make purple?", answer: "o3", o1:"Blue and Yellow", o2:"Green and Orange", o3:"Red and Blue", o4:"Red and Green" },
    { questionId: 4, question: "What is the square root of 9?", answer: "o2", o1:"1", o2:"3", o3:"27", o4:"81" },
    { questionId: 5, question: "Which Italian city has a famous leaning tower?", answer: "o2", o1:"Florence", o2:"Pisa", o3:"Rome", o4:"Venice" },
    { questionId: 6, question: "Which 1990s sitcom, set in California, starred comic actor Will Smith?", answer: "o2", o1:"Cheers", o2:"Fresh Prince Of Bel-Air", o3:"Mork And Mindy", o4:"The Golden Girls" }
 ] )