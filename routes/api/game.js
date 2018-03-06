const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const game = require('../../controllers/game/');
const errToJson = require('utils-error-to-json');

module.exports = function(collections){

	router.get('/newgame', async (req, res) => { // generate new gameId. pass to client
		try {
			const result = await game.newGame(collections);
			res.json( result );
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json( {'err':'internal'} );
		}
	});

	router.get('/highScore', async (req, res) => { // get top 10 results
		try {
			const response = await game.highScore(collections);
			var result;
			if(response.missing) {
				saveError(req.url, response);
				result = {'missing': response.missing};
			}
			else result = response;
			res.json( result );
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json( {'err':'internal'} );
		}
	});

	router.post('/question', jsonParser, async (req, res) => { // get next question
		console.log(req.body)
		const gameId = req.body.gameId;
		try {

			const response = await game.question(gameId, collections);
			res.json( response );
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json( {'err':'internal'} );
		}
	});

	router.post('/answer', jsonParser, async (req, res) => { // post answer to question. get response.
		const gameId = req.body.gameId;
		const userAnswer = req.body.userAnswer;
		try {
			res.json( await game.answer(gameId,userAnswer, collections) );
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json( {'err':'internal'} );
		}
	});

	router.post('/enterScore', jsonParser, async (req, res) => { // client posts gameId and Name. return top 10 scores
		try {
			const gameId = req.body.gameId;
			const userName = req.body.userName;
			const highScore = await game.enterScore( gameId , userName, collections);
			var result;
			if(highScore.missing) {
				saveError(req.url, highScore);
				result = {'missing': highScore.missing};
			}
			else result = highScore;
			res.json( result );
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json( {'err':'internal'} );
		}
	});

	// Catch errors to console.log
	function saveError(url, e){
		const fullUrl = '/api/game' + url;
		console.log(fullUrl, e)
	}
	
	return router;
};