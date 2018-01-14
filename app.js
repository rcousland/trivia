const express = require('express');
const app = express();
const host = require('./config/express.js').host;
const port = require('./config/express.js').port;

// Load routes
app.use(express.static('public'));
app.use('/user', require('./routes/user.js'));

// Start express
app.listen(port, host, () => {
	console.log(host + ' listening on port: ' + port);
});