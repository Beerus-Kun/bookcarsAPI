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

// db.insertCustomer = (username, password, first_name, last_name, phone_number, day_of_birth, address, gender, mail, id_role, image)=>{
//     return new Promise((resolve, reject)=>{
//         pool.query(`CALL SP_insertCustomer($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
//         [username, password, id_role, first_name, last_name, phone_number, day_of_birth, address, gender, mail, image],
//         (err,result)=>{
//             if(err) return reject(err);
//             return resolve(result.rows)
//         })
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
            .query('SELECT * FROM person WHERE mail=@mail',
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
            .query('SELECT * FROM person WHERE phone_number=@phone_number',
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
            .query('SELECT * FROM acount WHERE username = @username',
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
            .query('SELECT password FROM acount WHERE username = @username',
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
            .query('SELECT username FROM person WHERE phone_number = $phone_number',
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
            .query('SELECT username FROM person WHERE mail = @email',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].username)
            })
    })
}

db.selectIdByUsername = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .query('SELECT id FROM person WHERE username = @username',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].id)
            })
    })
}

db.selectRoleByUsername = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .query(`SELECT id_role, is_active 
                FROM roleuser 
                WHERE username = @username 
                ORDER BY id_role`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

db.selectFirstNameById = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .query('SELECT first_name FROM person WHERE id=@id_account',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].first_name)
            })
    })
}

db.selectLastNameById = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .query('SELECT last_name FROM person WHERE id=@id_account',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].last_name)
            })
    })
}

db.selectPhoneNumberById = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .query('SELECT phone_number FROM person WHERE id = @id_account',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].phone_number)
            })
    })
}

db.selectDayOfBirthById = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .query('SELECT CONVERT(VARCHAR, day_of_birth, 103) as date FROM person WHERE id = @id_account',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].date)
            })
    })
}

db.selectAdressById = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .query('SELECT address FROM person WHERE id=@id_account',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].address)
            })
    })
}

db.selectGenderById = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .query('SELECT gender FROM person WHERE id=@id_account',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].gender)
            })
    })
}

db.selectMailById = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .query('SELECT mail FROM person WHERE id=@id_account',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].mail)
            })
    })
}

db.selectImageById = (id_account)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("id_account", sql.Int, id_account)
            .query('SELECT image FROM person WHERE id=@id_account',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].image)
            })
    })
}

db.selectCodeByUsername = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .query('SELECT code FROM person WHERE username = @username',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].code)
            })
    })
}

db.selectMailByUsername = (username)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .query('SELECT mail FROM person WHERE username = @username',
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset[0].mail)
            })
    })
}

db.updatePasswordByUsername = (username, password)=>{
    return new Promise(async (resolve, reject)=>{
        const pool = await sql.connect(config);

        pool.request()
            .input("username", sql.NChar(25), username)
            .input("password", sql.NChar(128), password)
            .query(`UPDATE acount
                SET password = @password
                WHERE username = @username`,
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
            .query(`UPDATE person
                SET first_name = @first_name
                WHERE id = @id_account`,
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
            .query(`UPDATE person
                SET last_name = @last_name
                WHERE id = @id_account`,
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
            .input("", sql.NChar(25), username)
            .input("id_account", sql.Int, id_account)
            .input("phone_number", sql.NChar(12), phone_number)
            .query(`UPDATE person
                SET phone_number = @phone_number
                WHERE id = @id_account`,
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
            .query(`UPDATE person
                SET day_of_birth = @day_of_birth
                WHERE id = @id_account`,
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
            .query(`UPDATE person
                SET address = @address
                WHERE id = @id_account`,
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
            .query(`UPDATE person
                SET gender = @gender
                WHERE id = @id_account`,
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
            .query(`UPDATE person
                SET mail = @mail
                WHERE id = @id_account`,
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
            .query(`UPDATE person
                SET code = @code
                WHERE id = @id_account`,
            (err, result)=>{
                if(err) return reject(err);
                else resolve(result.recordset)
            })
    })
}

module.exports = db;