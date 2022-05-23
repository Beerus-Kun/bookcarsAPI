// const pool = require('../../database');
const config = require('../../config')
const sql = require('mssql')

const db = {};


db.selectTransportDetail = ()=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            // .input("", sql.NChar(25), username)
            .execute('SP_selectTransportDetail',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
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