const http = require('http')

let Server = http.createServer( function(request, respon) {
    console.log(request)
    if (request.url == '/') {
        respon.writeHead(200, {'Content-type': 'text/html'})
        respon.write('<h1> Halaman Beranda</h1>')
        respon.end()
    } else if (request.url == '/profil') {
        respon.writeHead(200, {'Content-type': 'text/html'})
        respon.write('<h1> ini profil saya</h1>')
        respon.end()
    } else {
        respon.writeHead(200, {'Content-type': 'text/html'})
        respon.write('<h1> 404 not found</h1>')
        respon.end()
    }

    
})

Server.listen(3000, function() {
        console.log('Server sudah siap, buka http://localhost:3000')
    })