const express = require('express');
const morgan = require('morgan')
const app = express();
const e = require('./config/express.js');
const gameRoutes = require('./routes/api/game.js')
const catchAllRoute = require('./routes/catchAll.js')

// Catch error codes to console.log
app.use( morgan(':method :url :status :res[content-length] - :response-time ms') );

// Load Routes
app.use(express.static('public')); // static files in /public dir
app.use('/api/game', gameRoutes); // game routes
app.use(catchAllRoute); //catch all

// Start Express
app.listen(e.port, e.host, () => {
	console.log(e.host + ' listening on port: ' + e.port);
});