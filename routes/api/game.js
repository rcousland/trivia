const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const game = require('../../controllers/game/');

module.exports = function(collections){

	router.get('/newgame', async (req, res) => { // generate new gameId. pass to client
		try {
			res.json( await game.newGame(collections) );
		} catch(e) {
			saveError(req.url, e)
			res.status( 500 ).json( {'err':'internal'} )
		}
	});

	router.get('/highScore', async (req, res) => { // get top 10 results
		try {
			res.json( await game.highScore(collections) );
		} catch(e) {
			saveError(req.url, e)
			res.status( 500 ).json( {'err':'internal'} )
		}
	});

	router.post('/question', jsonParser, async (req, res) => { // get next question
		const gameId = req.body.gameId;
		try {
			res.json( await game.question(gameId, collections) );
		} catch(e) {
			saveError(req.url, e)
			res.status( 500 ).json( {'err':'internal'} )
		}
	});

	router.post('/answer', jsonParser, async (req, res) => { // post answer to question. get response.
		const gameId = req.body.gameId;
		const userAnswer = req.body.userAnswer;
		try {
			res.json( await game.answer(gameId,userAnswer, collections) );
		} catch(e) {
			saveError(req.url, e)
			res.status( 500 ).json( {'err':'internal'} )
		}
	});

	router.post('/enterScore', jsonParser, async (req, res) => { // client posts gameId and Name. return top 10 scores
		const gameId = req.body.gameId;
		const userName = req.body.userName;
		try {
			res.json( await game.enterScore( gameId , userName, collections) );
		} catch(e) {
			saveError(req.url, e)
			res.status( 500 ).json( {'err':'internal'} )
		}
	});

	// Catch errors to console.log
	function saveError(url, e){
		const fullUrl = '/api/game' + url
		console.log( JSON.stringify({'url':fullUrl, 'err':e}, null , 4) )
	}
	
	return router
}