const express = require('express');
const app = express();
const e = require('./config/express.js');

// Load routes
app.use(express.static('public')); // static files in /public dir
app.use('/api/game', require('./routes/api/game.js')); // game routes
app.use( (req,res) => { require('./routes/catchAll.js')(req,res) }); //catch all

// Start express
app.listen(e.port, e.host, () => {
	console.log(e.host + ' listening on port: ' + e.port);
});