const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const game = require('../../controllers/game/');

router.get('/newgame', async (req, res) => { // generate new gameId. pass to client
	try {
		res.json( await game.newGame() );
	} catch(e) {
		res.status( 500 ).json( {'err':e} )
	}
});

router.get('/highScore', async (req, res) => { // get top 10 results
	try {
		res.json( await game.highScore() );
	} catch(e) {
		res.status( 500 ).json( {'err':e} )
	}
});

router.post('/question', jsonParser, async (req, res) => { // get next question
	const gameId = req.body.gameId;
	try {
		res.json( await game.question(gameId) );
	} catch(e) {
		res.status( 500 ).json( {'err':e} )
	}
});

router.post('/answer', jsonParser, async (req, res) => { // post answer to question. get response.
	const gameId = req.body.gameId;
	const userAnswer = req.body.userAnswer;
	try {
		res.json( await game.answer(gameId,userAnswer) );
	} catch(e) {
		res.status( 500 ).json( {'err':e} )
	}
});

router.post('/enterScore', jsonParser, async (req, res) => { // client posts gameId and Name. return top 10 scores
	const gameId = req.body.gameId;
	const userName = req.body.userName;
	try {
		res.json( await game.enterScore( gameId , userName) );
	} catch(e) {
		res.status( 500 ).json( {'err':e} )
	}
});

module.exports = router;