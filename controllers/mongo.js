const mongodb = require('mongodb');
var url = "mongodb://localhost:27017/";
var dbName = 'trivia'

module.exports = async function(){
    const db = await mongodb.MongoClient.connect(url)
    const dbo = db.db(dbName)       
    return {
        games: dbo.collection("games"),
        questionsAndAnswers: dbo.collection("questionsAndAnswers"),
        highScore: dbo.collection("highScore"),
        db: db
    }
}