const express = require('express');
const app = express();
const e = require('./config/express.js');

// Load routes
app.use(express.static('public'));
app.use('/api/user', require('./routes/api/user.js'));

// Start express
app.listen(e.port, e.host, () => {
	console.log(e.host + ' listening on port: ' + e.port);
});