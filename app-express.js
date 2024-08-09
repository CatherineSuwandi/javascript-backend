const express   = require('express')
const app       = express()
const port      = 3000


app.set('view engine', 'ejs') // setting pengunaan template engine untuk express
app.set('views', './view-ejs') // setting penggunaan folder untuk menyimpan file .ejs


app.get('/', function(req, res) {
    res.send(`<h1>Hello World !!</h1>`)
})

// the '/hubungi' is called route that exists within the URL
app.get('/hubungi', function(req, res) {
    let data = {
        email: 'me@mail.com',
        wa: 'XXXX XXXX XXX',
        socmed: 'codingcat',
    }
    res.render('hubungi-developer', data)
    // res.send(`<h1>Please Contact Here: XXX XXX XXXX</h1>`)
})

app.get('/profil', function(req, res) {
    let data = {
        jabatan: 'Beginner Programmer',
        gender: 'Girl',
        gaji: 4000000,
    }
res.render('profil-developer', data) // can be 'profil-developer.ejs' too
    // error bc express cant read files with the extension .html
    // res.send(require('./view/profil.html'))
})


app.listen(port, function() {
    console.log('Server sudah siap, buka http://localhost:3000' + port)

})