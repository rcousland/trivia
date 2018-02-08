const path = require('path');

module.exports = (req,res) =>{
    res.status(404)

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile( path.join(__dirname + '/../public/404/index.html') )
        return;
    }

    // respond with json
    else if (req.accepts('json')) {
        res.send( {error: 'Not found'} );
        return;
    }

    // default to plain-text. send()
    else {
        res.type('txt').send('Not found');
    }
}