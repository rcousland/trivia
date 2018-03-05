const path = require('path');

module.exports = (req,res) =>{
	res.status(404);

	if (req.accepts('html')) {
		res.sendFile( path.join(__dirname + '/../public/404/index.html') );
	}
	else if (req.accepts('json')) {
		res.send( {'error': 'Path not found'} );
	}
	else {
		res.type('txt').send('Path not found');
	}
};