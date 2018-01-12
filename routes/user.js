const express = require('express');
var router = express.Router();

const game = require('../controllers/game.js');

router.get('/newgame', (req, res) => {
	game.newGame( (err,data) => {
		if(err){
			res.status( 500 ).send(err);
		}
		else{
			res.send( data );
		}
	});
	// start new game....
	// create "gameID"
	// send gameID and first question
});
// router.post('/answer', jsonParser, (req, res) => {
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

// router.post('/name/{name}', (req, res) => {
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

module.exports = router;