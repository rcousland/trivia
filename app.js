const express = require('express');
const app = express();
const e = require('./config/express.js');
const gameRoutes = require('./routes/api/game.js')
const catchAllRoute = require('./routes/catchAll.js')

// Load Routes
app.use(express.static('public')); // static files in /public dir
app.use('/api/game', gameRoutes); // game routes
app.use(catchAllRoute); //catch all

// Start Express
app.listen(e.port, e.host, () => {
	console.log(e.host + ' listening on port: ' + e.port);
});