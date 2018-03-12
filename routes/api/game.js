const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const game = require('../../controllers/game/');
const errInternal = {'err':'internal'}

module.exports = function(collections){

	router.get('/newgame', async (req, res) => { // generate new gameId. pass to client
		try {
			const result = await game.newGame(collections);
			res.json(result);
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json(errInternal);
		}
	});

	router.get('/highScore', async (req, res) => { // get top 10 results
		try {
			const result = await game.highScore(collections);
			res.json(result);
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json(errInternal);
		}
	});

	router.post('/question', jsonParser, async (req, res) => { // get next question
		const gameId = req.body.gameId;
		try {
			const result = await game.question(gameId, collections);
			res.json(result);
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json(errInternal);
		}
	});

	router.post('/answer', jsonParser, async (req, res) => { // post answer to question. get response.
		const gameId = req.body.gameId;
		const userAnswer = req.body.userAnswer;
		try {
			const result = await game.answer(gameId, userAnswer, collections)
			res.json(result);
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json(errInternal);
		}
	});

	router.post('/enterScore', jsonParser, async (req, res) => { // client posts gameId and Name. return top 10 scores
		try {
			const gameId = req.body.gameId;
			const userName = req.body.userName;
			const result = await game.enterScore(gameId , userName, collections);
			res.json(result);
		} catch(e) {
			saveError(req.url, e);
			res.status( 500 ).json(errInternal);
		}
	});

	// Catch errors to console.log
	function saveError(url, e){
		const fullUrl = '/api/game' + url;
		console.log(fullUrl, e)
	}
	
	return router;
};