const express = require('express');
var router = express.Router();
const jsonParser = require('body-parser').json();

var game = require('../../controllers/game/');

router.get('/newgame', async (req, res) => { // generate new gameId. pass to client
	try {
		const result = await game.newGame()
		res.json( result );
	} catch(e) {
		const errResponse = {'err': e }
		res.status( 500 ).json( errResponse )
	}
});

router.get('/highScore', async (req, res) => { // get top 10 results
	try {
		const result = await game.highScore()
		res.json( result );
	} catch(e) {
		const errResponse = {'err':e}
		res.status( 500 ).json(errResponse)
	}
});

router.post('/question', jsonParser, async (req, res) => { // get next question
	const gameId = req.body.gameId;
	try {
		const result = await game.question( gameId )
		res.json( result );
	} catch(e) {
		const errResponse = {'err':e}
		res.status( 500 ).json( errResponse )
	}
});

router.post('/answer', jsonParser, async (req, res) => { // post answer to question. get response.
	const gameId = req.body.gameId;
	const userAnswer = req.body.userAnswer;
	try {
		const result = await game.answer( gameId , userAnswer)
		res.json( result );
	} catch(e) {
		const errResponse = {'err':e}
		res.status( 500 ).json( errResponse )
	}
});

router.post('/enterScore', jsonParser, (req, res) => {
	var gameId = req.body.gameId;
	var userName = req.body.userName;
	game.enterScore( gameId, userName, (err,data) => {
		if(err){ 
			res.status( 500 ).send(err);
		}
		else{
			res.json(data);
		}
	});
	// post gameId and Name
	// get top 10 scores
});


module.exports = router;