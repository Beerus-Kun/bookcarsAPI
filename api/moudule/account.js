// const pool = require('../../database');
const config = require('../../config')
const sql = require('mssql')

const db = {};


// db. = ()=>{
//     return new Promise(async (resolve, reject)=>{
//         const pool = await sql.connect(config);

//         pool.request()
//             .input("", sql.NChar(25), username)
//             .query('',
//             (err, result)=>{
//                 if(err) return reject(err);
//                 else resolve(result.recordset)
//             })
//     })
// }

db.insertCustomer = (username, password, first_name, last_name, phone_number, day_of_birth, address, gender, mail, id_role, image)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .input("password", sql.NChar(128), password)
            .input("first_name", sql.NVarChar(50), first_name)
            .input("last_name", sql.NVarChar(50), last_name)
            .input("phone_number", sql.NChar(12), phone_number)
            .input("day_of_birth", sql.Date, day_of_birth)
            .input("address", sql.NVarChar(250), address)
            .input("gender", sql.Bit, gender)
            .input("mail", sql.NChar(50), mail)
            .input("id_role", sql.Int, id_role)
            .input("image", sql.NChar(250), image)
            .execute('SP_insertCustomer',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.hasMail = (mail)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("mail", sql.NChar(50), mail)
            .execute('SP_selectPersonByEmail',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.rowsAffected>0)
            })
    })
}

db.hasPhoneNumber = (phone_number)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("phone_number", sql.NChar(12), phone_number)
            .execute('SP_selectPersonByPhonenumber',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.rowsAffected>0)
            })
    })
}

db.hasUsername = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .execute('SP_selectPersonByUsername',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.rowsAffected>0)
            })
    })
}

db.selectPassword = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .execute('SP_selectPasswordByUsername',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].password)
            })
    })
}

db.selectUsernameByPhone = (phone_number)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("phone_number", sql.NChar(12), phone_number)
            .execute('SP_selectPersonByPhonenumber',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].username)
            })
    })
}

db.selectUsernameByEmail = (email)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("email", sql.NChar(50), email)
            .execute('SP_selectPersonByEmail',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].username)
            })
    })
}

db.selectByUsername = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .execute('SP_selectPersonByUsername',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0])
            })
    })
}

db.selectRoleByUsername = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .execute(`SP_selectRoleByUsername`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.selectById = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .execute('SP_selectPersonByIdAccount',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0])
            })
    })
}

db.updatePasswordByUsername = (username, password)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .input("password", sql.NChar(128), password)
            .execute(`SP_updatePasswordByUsername`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.updateFirstNameById = (id_account, first_name)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .input("first_name", sql.NVarChar(50), first_name)
            .query(`SP_updateFirstNameByUsername`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.updateLastNameById = (id_account, last_name)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .input("last_name", sql.NVarChar(50), last_name)
            .execute(`SP_updateLastNameById`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.updatePhoneNumberById = (id_account, phone_number)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .input("phone_number", sql.NChar(12), phone_number)
            .execute(`SP_updatePhoneNumberById`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.updateDayOfBirthById = (id_account, day_of_birth)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .input("day_of_birth", sql.Date, day_of_birth)
            .execute(`SP_updateDayOfBirthById`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.updateAdressById = (id_account, address)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .input("address", sql.NVarChar(250), address)
            .execute(`SP_updateAdressById`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.updateGenderById = (id_account, gender)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .input("gender", sql.Bit, gender)
            .execute(`SP_updateGenderById`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.updateMailById = (id_account, mail)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .input("mail", sql.NChar(50), mail)
            .execute(`SP_updateMailById`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.updateCodeByUsername = (id_account, code)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .input("code", sql.NChar(128), code)
            .execute(`SP_updateCodeByUsername`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

module.exports = db;