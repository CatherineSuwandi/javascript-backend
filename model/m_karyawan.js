const db = require('../config/database').db

module.exports = 
{


// buat function terpisah untuk
// proses pengambilan data dari awal
get_semuaKaryawan: function() {
    return new Promise( (resolve,reject)=>{
        db.query("SELECT * FROM employees", function(errorSql, hasil){
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            }) 
    })
},


get_satuKaryawan: function(idk) {
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
},


insert_karyawan: function(req) {
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

},

update_karyawan: function(req, idk) {
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
},

hapus_satuKaryawan: function(idk) {
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

}