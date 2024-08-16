const express   = require('express')
const app       = express()
const port      = 3000
const mysql     = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
})

db.connect()


// untuk mengambil data yg ter-encoded(enkripsi) dari form html
// yg dikirmkan melalui protokol http
app.use( express.urlencoded({extended:false})) 
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


// buat function terpisah untuk
// proses pengambilan data dari awal
function get_semuaKaryawan() {
    return new Promise( (resolve,reject)=>{
        db.query("SELECT * FROM employees", function(errorSql, hasil){
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            }) 
    })
}


// gunakan async await, utuk memaksa node js
// menunggu script yg di panggil sampai selesai di eksekusi
app.get('/karyawan', async function(req,res) {
    // ambil object query string msg
        let dataview = {
         karyawan: await get_semuaKaryawan(),
         message: req.query.msg
        }
    res.render('karyawan/index', dataview)
}) 

app.get('/karyawan/detail/:id_karyawan', async function (req,res) {

    // ambil id yg dikirim via url
    let idk = req.params.id_karyawan

    // setelah itu kirim ke proses request data mysql
    let dataview = {
        pegawai: await get_satuKaryawan(idk),
        
    }
    res.render('karyawan/detail', dataview)
})


function get_satuKaryawan(idk) {
    let sql =
    `SELECT 
        employees.*, 
        department.kode AS kode_dept, department.nama AS nama_dept,
        agama.nama AS nama_agama
    FROM employees
    LEFT JOIN department    ON department.id = employees.department_id
    LEFT JOIN agama         ON agama.id = employees.agama_id
    WHERE employees.id = ?`;

    return new Promise( (resolve,reject)=>{
        db.query(sql, [idk], function(errorSql, hasil){
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            }) 
    })
}


app.get('/karyawan/hapus/:id_karyawan', async function(req,res) {
    // ambil id yg dikirm via url
    let idk = req.params.id_karyawan

    // proses hapus data
    try {
        let hapus = await hapus_satuKaryawan(idk)
        if(hapus.affectedRows > 0) {
            res.redirect('/karyawan?msg=berhasil hapus karyawan')
        }
    } catch(error) {
        throw error
    }
})

function hapus_satuKaryawan(idk) {
    let sql =
    `DELETE FROM employees 
    WHERE id = ?`;

    return new Promise( (resolve,reject)=>{
        db.query(sql, [idk], function(errorSql, hasil){
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            }) 
    })
}


app.get('/karyawan/tambah', async function(req,res) {
    // ambil data departmen dari database tabel department
    let dataview = {
        dept: await get_semuaDepartment(),
        agm: await get_semuaAgama()
    }
    res.render('karyawan/form-tambah', dataview)
})

function get_semuaDepartment() {
    return new Promise( (resolve,reject)=>{
        db.query("SELECT * FROM department", function(errorSql, hasil){
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            }) 
    })
}


function get_semuaAgama() {
    return new Promise( (resolve,reject)=>{
        db.query("SELECT * FROM agama", function(errorSql, hasil){
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            }) 
    })
}



app.post('/karyawan/proses-insert', async function(req,res) {
    // terima kiriman dara dari form html
     let body = req.body

    try {
        let insert = await insert_karyawan(req)
        if (insert.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }

})

function insert_karyawan(req) {
    let data = {
        nama              : req.body.form_nama_lengkap,
        gender            : req.body.form_gender,
        alamat            : req.body.form_alamat,
        nip               : req.body.form_nip,
        department_id     : req.body.form_department,
        agama_id          : req.body.form_agama,
    }
    let sql = `INSERT INTO employees SET ?`;

    return new Promise( (resolve,reject)=>{
        db.query(sql, [data], function(errorSql, hasil){
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            }) 
    })

}


app.get('/karyawan/edit/:id_karyawan', async function(req,res) {
    let idk = req.params.id_karyawan

    let dataview = {
        dept    : await get_semuaDepartment(),
        agm     : await get_semuaAgama(),
        pegawai : await get_satuKaryawan(idk),
    }
    res.render('karyawan/form-edit', dataview)
})


app.post('/karyawan/proses-update/:id_karyawan', async  function(req,res){
    let idk = req.params.id_karyawan
    try {
        let update = await update_karyawan(req, idk)
        if (update.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil edit karyawan a/n ${req.body.form_nama_lengkap} `)
        }
    } catch (error) {
        throw error
    }

})

function update_karyawan(req, idk) {
    let data = {
        nama              : req.body.form_nama_lengkap,
        gender            : req.body.form_gender,
        alamat            : req.body.form_alamat,
        nip               : req.body.form_nip,
        department_id     : req.body.form_department,
        agama_id          : req.body.form_agama,
    }
    let sql = `UPDATE employees SET ? WHERE id = ?`;

    return new Promise( (resolve,reject)=>{
        db.query(sql, [data, idk], function(errorSql, hasil){
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            }) 
    })
}

app.listen(port, function() {
    console.log('Server sudah siap, buka http://localhost:3000' + port)

})