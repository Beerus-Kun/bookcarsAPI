// const pool = require('../../database');
const config = require('../../config')
const sql = require('mssql')

const db = {};


db.selectBalance = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);
        pool.request()
            .input("id_user", id_account)
            .execute('SP_selectBalance',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0])
            })
    })
}

// db. = ()=>{
//     return new Promise(async (resolve, reject)=>{
//         const pool = await sql.connect(config);

//         pool.request()
//             .input("", sql.NChar(25), username)
//             .execute('',
//             (err, result)=>{
//                 if(err) return reject(err);
//                 else resolve(result.recordset)
//             })
//     })
// }

module.exports = db;