const http = require('http')

// http.createServer((Request, response)->{

// })


http.createServer( function(request, respon) {
    // mendeteksi status http 200 (user berhasil terkoneksi dengan aplikasi kita)
    // Content-type: apa tipe konten yg ingin diberikan ke user
    respon.writeHead(200, {'Content-type': 'text/plain'})
    // hasil akhir yg akan diberikan ke user
    respon.end('Hello World')
}).listen(3000, function(){
    console.log('PLS WORK')
}) 


Server.listen(3000, function() {
    console.log('Server sudah siap, buka http://localhost:3000')
})