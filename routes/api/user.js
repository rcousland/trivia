const express = require('express');
var router = express.Router();
const jsonParser = require('body-parser').json();

var game = require('../../controllers/game/');

router.get('/newgame', (req, res) => {
	game.newGame( (err,data) => {
		if(err){ 
			res.status( 500 ).send(err);
		}
		else{
			res.json(data);
		}
	});

	// start new game....
	// create "gameID"
	// send gameID
});
router.post('/question', jsonParser, (req, res) => {
	var gameId = req.body.gameId;
	game.getQuestion( gameId, (err,data) => {
		if(err){ 
			res.status( 500 ).send(err);
		}
		else{
			res.json(data);
		}
	});
	// get next question
});

router.post('/answer', jsonParser, (req, res) => {
	var gameId = req.body.gameId;
	var userAnswer = req.body.userAnswer;
	game.answer( gameId, userAnswer , (err,data) => {
		if(err){ 
			res.status( 500 ).send(err);
		}
		else{
			res.json(data);
		}
	});
	// post answer to question
	// get response.
});

module.exports = router;