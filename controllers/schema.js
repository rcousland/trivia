const mongojs = require('mongojs')
const mongoUrl = require('../config/mongo.js')

// Connect to mongo DB and set events
const db = mongojs( mongoUrl );
require('./mongo.js')(db)

var user = db.collection('triviaUsers')
var qa = db.collection('questionsAndAnswers')
var games = db.collection('games')

module.exports.games(db) = {
    getGameId: () => {
        testData.findOne( (err, docs) => {
            if(err)throw new Error(err)
            
            else{
                return (docs)
            }
        })
    },
}




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
