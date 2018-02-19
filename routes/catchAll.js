const path = require('path');

module.exports = (req,res) =>{
	res.status(404);

	if (req.accepts('html')) { // respond with html page
		res.sendFile( path.join(__dirname + '/../public/404/index.html') );
	}
	else if (req.accepts('json')) { // respond with json
		res.send( {'error': 'Path not found'} );
	}
	else { // default to plain-text
		res.type('txt').send('Path not found');
	}
};