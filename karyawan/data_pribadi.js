let nama = 'Sunday'
let alamat = 'Penacony'

function biodata() {
       return  `Biodata karyawan: \n
        ===================\n
        Nama: ${nama}\n
        Alamat: ${alamat}\n
        `
}

module.exports = {
    nama, alamat, cetakbio:biodata
}