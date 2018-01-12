const bodyParser = require('body-parser').json()
const game = require('../controllers/game.js')

module.exports = function(app, db){
    app.get('/newgame', (req, res) => {
        game.newGame( (err,data)=>{
            if(err){
                res.status( 500 ).send(err)
            }
            else{
                res.send( data )
            }
        })
        // start new game....
        // create "gameID"
        // send gameID and first question
    });
    // app.post('/answer', jsonParser, (req, res) => {
    //     var gameID = req.body.gameID
    //     var questionID = req.body.questionID
    //     var userAnswerID = req.body.userAnswer

    //     game.userAnswer( , (err,data) => {
    //         if(err){
    //             res.status( 500 ).send(err)
    //         }
    //         else{
    //             res.send( data )
    //         }
    //     })

    //     // post answer to question
    //     // get response.
    // });

    // app.post('/name/{name}', (req, res) => {
    //     game.usersName( (err,data) => {
    //         if(err){
    //             res.status( 500 ).send(err)
    //         }
    //         else{
    //             res.send( data )
    //         }
    //     })
    //     // post users name. enter into DB
    //     // get response
    // });
}