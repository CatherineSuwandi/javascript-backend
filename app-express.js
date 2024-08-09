const express   = require('express')
const app       = express()
const port      = 3000


app.get('/', function(req, res) {
    res.send(`<h1>Hello World !!</h1>`)
})

// the '/hubungi' is called route that exists within the URL
app.get('/hubungi', function(req, res) {
    res.send(`<h1>Please Contact Here: XXX XXX XXXX</h1>`)
})

app.get('/login', function(req, res) {
    res.send(`<h1>Nothing here stupid</h1>`)
})


app.listen(port, function() {
    console.log('Server sudah siap, buka http://localhost:3000' + port)

})