const db = require('../config/database').db

module.exports = 
{


get_semuaDepartment: function() {
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

}