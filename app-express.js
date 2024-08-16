const express   = require('express')
const app       = express()
const port      = 3000



// untuk mengambil data yg ter-encoded(enkripsi) dari form html
// yg dikirmkan melalui protokol http
app.use( express.urlencoded({extended:false})) 
app.set('view engine', 'ejs') // setting pengunaan template engine untuk express
app.set('views', './view-ejs') // setting penggunaan folder untuk menyimpan file .ejs

// include masing-masing model
const m_karyawan = require('./model/m_karyawan')
const m_department = require('./model/m_department')
const m_agama = require('./model/m_agama')


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
app.get('/karyawan', async function(req,res) {
    // ambil object query string msg
        let dataview = {
         karyawan: await m_karyawan.get_semuaKaryawan(),
         message: req.query.msg
        }
    res.render('karyawan/index', dataview)
}) 

app.get('/karyawan/detail/:id_karyawan', async function (req,res) {

    // ambil id yg dikirim via url
    let idk = req.params.id_karyawan

    // setelah itu kirim ke proses request data mysql
    let dataview = {
        pegawai: await m_karyawan.get_satuKaryawan(idk),
        
    }
    res.render('karyawan/detail', dataview)
})





app.get('/karyawan/hapus/:id_karyawan', async function(req,res) {
    // ambil id yg dikirm via url
    let idk = req.params.id_karyawan

    // proses hapus data
    try {
        let hapus = await m_karyawan.hapus_satuKaryawan(idk)
        if(hapus.affectedRows > 0) {
            res.redirect('/karyawan?msg=berhasil hapus karyawan')
        }
    } catch(error) {
        throw error
    }
})




app.get('/karyawan/tambah', async function(req,res) {
    // ambil data departmen dari database tabel department
    let dataview = {
        dept: await m_department.get_semuaDepartment(),
        agm: await m_agama.get_semuaAgama()
    }
    res.render('karyawan/form-tambah', dataview)
})






app.post('/karyawan/proses-insert', async function(req,res) {
    // terima kiriman dara dari form html
     let body = req.body

    try {
        let insert = await m_karyawan.insert_karyawan(req)
        if (insert.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }

})




app.get('/karyawan/edit/:id_karyawan', async function(req,res) {
    let idk = req.params.id_karyawan

    let dataview = {
        dept    : await m_department.get_semuaDepartment(),
        agm     : await m_agama.get_semuaAgama(),
        pegawai : await m_karyawan.get_satuKaryawan(idk),
    }
    res.render('karyawan/form-edit', dataview)
})


app.post('/karyawan/proses-update/:id_karyawan', async  function(req,res){
    let idk = req.params.id_karyawan
    try {
        let update = await m_karyawan.update_karyawan(req, idk)
        if (update.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil edit karyawan a/n ${req.body.form_nama_lengkap} `)
        }
    } catch (error) {
        throw error
    }

})



app.listen(port, function() {
    console.log('Server sudah siap, buka http://localhost:3000' + port)

})