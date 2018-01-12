const express = require('express')
const app = express()
const c = require('./config/express.js')

// Load routes
app.use(express.static('public'))
app.use('/user', require('./routes/user.js'))
//require('./routes/user.js')(app);

// Start express
app.listen(port, host, () => {
    console.log(c.host + ' listening on port ' + c.port)
})