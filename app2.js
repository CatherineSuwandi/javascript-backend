const http = require('http')

let Server = http.createServer( function(request, respon) {
    let nama = "Sunday"
    let alamat = 'The Oak Family Manor'
    let html = `<h1> Hi I'm ${nama}, I live in ${alamat} </h1>`
    console.log(nama)
    respon.writeHead(200, {'Content-type': 'text/html'})
    respon.end(html)
})

Server.listen(3000, function() {
        console.log('Server sudah siap, buka http://localhost:3000')
    })