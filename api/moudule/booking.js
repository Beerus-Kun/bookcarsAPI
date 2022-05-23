// const pool = require('../../database');
const config = require('../../config')
const sql = require('mssql')

const db = {};

db.hasBooking = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", id_account)
            .execute('SP_hasBooking',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.rowsAffected>0)
            })
    })
}

db.createBooking = (id_account, distance, total, start_point, end_point, id_state)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);
        pool.request()
            .input("id_account", id_account)
            .input("distance", distance)
            .input("total", total)
            .input("start_point", start_point)
            .input("end_point", end_point)
            .input("id_state", id_state)
            .execute('SP_createBooking',
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