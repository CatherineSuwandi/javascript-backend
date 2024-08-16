const mysql         = require('mysql2')
const db            = require('../config/database').db
const eksekusi      = require('../config/database').eksekusi

module.exports = 
{


// buat function terpisah untuk
// proses pengambilan data dari awal
get_semuaKaryawan: function() {
    return eksekusi(mysql.format(
        "SELECT * FROM employees"
    ))
},


get_satuKaryawan: function(idk) {
    return eksekusi(mysql.format(
        `SELECT 
        employees.*, 
        department.kode AS kode_dept, department.nama AS nama_dept,
        agama.nama AS nama_agama
    FROM employees
    LEFT JOIN department    ON department.id = employees.department_id
    LEFT JOIN agama         ON agama.id = employees.agama_id
    WHERE employees.id = ?`,
    [idk]
    ))
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
    return eksekusi(mysql.format(
        `INSERT INTO employees SET ?`,
        [data]
    ))

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
    return eksekusi(mysql.format(
        `UPDATE employees SET ? WHERE id = ?`,
        [data,idk]
    ))

},

hapus_satuKaryawan: function(idk) {
    return eksekusi(mysql.format(
        `DELETE FROM employees 
        WHERE id = ?`,
        [idk]
    ))
}

}