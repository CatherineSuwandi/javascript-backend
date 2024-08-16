const express   = require('express')
const app       = express()
const port      = 3000



// untuk mengambil data yg ter-encoded(enkripsi) dari form html
// yg dikirmkan melalui protokol http
app.use( express.urlencoded({extended:false})) 
app.set('view engine', 'ejs') // setting pengunaan template engine untuk express
app.set('views', './view-ejs') // setting penggunaan folder untuk menyimpan file .ejs

// include masing-masing model
const m_karyawan    = require('./model/m_karyawan')
const m_department  = require('./model/m_department')
const m_agama       = require('./model/m_agama')

const c_karyawan    = require('./controller/c_karyawan')


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




// gunakan async await, utuk memaksa node js
// menunggu script yg di panggil sampai selesai di eksekusi
app.get('/karyawan', c_karyawan.index ) 
app.get('/karyawan/detail/:id_karyawan', c_karyawan.detail)
app.get('/karyawan/hapus/:id_karyawan', c_karyawan.hapus )
app.get('/karyawan/tambah', c_karyawan.tambah )
app.post('/karyawan/proses-insert', c_karyawan.proses_insert)
app.get('/karyawan/edit/:id_karyawan', c_karyawan.edit)
app.post('/karyawan/proses-update/:id_karyawan',c_karyawan.update )



app.listen(port, function() {
    console.log('Server sudah siap, buka http://localhost:3000' + port)

})