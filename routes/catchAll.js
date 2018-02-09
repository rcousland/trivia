const path = require('path');

module.exports = (req,res, next) =>{
    res.status(404)

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile( path.join(__dirname + '/../public/404/index.html') )
    }

    // respond with json
    else if (req.accepts('json')) {
        res.send( {'error': 'Path not found'} );
    }

    // default to plain-text. send()
    else {
        res.type('txt').send('Path not found');
    }
}