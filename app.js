const express = require('express')
const app = express()
const config = require('./config/express.js')
const port = config.port
const host = config.host

// Load routes
app.use(express.static('public'))
app.use('/user', require('./routes/user.js'))
//require('./routes/user.js')(app);

// Start express
app.listen(port, host, () => {
    console.log(host + ' listening on port ' + port)
})