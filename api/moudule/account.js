const pool = require('../../database');

const db = {};

// db. = ()=>{
//     return new Promise((resolve, reject)=>{
//         pool.query(``,
//         [],
//         (err,result)=>{
//             if(err) return reject(err);
//             return resolve(result.rowCount>0)
//         })
//     })
// }

db.insertCustomer = (username, password, first_name, last_name, phone_number, day_of_birth, address, gender, mail, id_role, image)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`CALL SP_insertCustomer($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [username, password, id_role, first_name, last_name, phone_number, day_of_birth, address, gender, mail, image],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows)
        })
    })
}

db.hasMail = (mail)=>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM person WHERE mail=$1',
        [mail],
        (err, result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.hasPhoneNumber = (phone_number)=>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM person WHERE phone_number=$1',
        [phone_number],
        (err, result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.hasUsername = (username)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM acount WHERE username = $1`,
        [username],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.selectPassword = (username)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT password FROM acount WHERE username = $1`,
        [username],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].password)
        })
    })
}

db.selectUsernameByPhone = (phone_number)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT username FROM person WHERE phone_number = $1`,
        [phone_number],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].username)
        })
    })
}

db.selectUsernameByEmail = (email)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT username FROM person WHERE mail = $1`,
        [email],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].username)
        })
    })
}

db.selectIdByUsername = (username)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT id FROM person WHERE username = $1`,
        [username],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].id)
        })
    })
}

db.selectRoleByUsername = (username)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT id_role, is_active 
                FROM roleuser 
                WHERE username = $1 
                ORDER BY id_role`,
        [username],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows)
        })
    })
}

db.selectFirstNameById = (id_account)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT first_name FROM person WHERE id=$1`,
        [id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].first_name)
        })
    })
}

db.selectLastNameById = (id_account)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT last_name FROM person WHERE id=$1`,
        [id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].last_name)
        })
    })
}

db.selectPhoneNumberById = (id_account)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT phone_number FROM person WHERE id = $1`,
        [id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].phone_number)
        })
    })
}

db.selectDayOfBirthById = (id_account)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT TO_CHAR(day_of_birth :: date, 'dd/mm/yyyy') as date FROM person WHERE id = $1`,
        [id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].date)
        })
    })
}

db.selectAdressById = (id_account)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT address FROM person WHERE id=$1`,
        [id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].address)
        })
    })
}

db.selectGenderById = (id_account)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT gender FROM person WHERE id=$1`,
        [id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].gender)
        })
    })
}

db.selectMailById = (id_account)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT mail FROM person WHERE id=$1`,
        [id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].mail)
        })
    })
}

db.selectImageById = (id_account)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT image FROM person WHERE id=$1`,
        [id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].image)
        })
    })
}

db.selectCodeByUsername = (username)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT code FROM person WHERE username = $1`,
        [username],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].code)
        })
    })
}

db.selectMailByUsername = (username)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT mail FROM person WHERE username = $1`,
        [username],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rows[0].mail)
        })
    })
}

db.updatePasswordByUsername = (username, password)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE acount
                    SET password = $1
                    WHERE username = $2`,
        [password,username],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.updateFirstNameById = (id_account, first_name)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE person
                    SET first_name = $1
                    WHERE id = $2`,
        [first_name, id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.updateLastNameById = (id_account, last_name)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE person
                    SET last_name = $1
                    WHERE id = $2`,
        [last_name, id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.updatePhoneNumberById = (id_account, phone_number)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE person
                    SET phone_number = $1
                    WHERE id = $2`,
        [phone_number, id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.updateDayOfBirthById = (id_account, day_of_birth)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE person
                    SET day_of_birth = $1
                    WHERE id = $2`,
        [day_of_birth, id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.updateAdressById = (id_account, address)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE person
                    SET address = $1
                    WHERE id = $2`,
        [address, id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.updateGenderById = (id_account, gender)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE person
                    SET gender = $1
                    WHERE id = $2`,
        [gender, id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.updateMailById = (id_account, mail)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE person
                    SET mail = $1
                    WHERE id = $2`,
        [mail, id_account],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

db.updateCodeByUsername = (username, code)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE person
                    SET code = $1
                    WHERE username = $2 `,
        [code, username],
        (err,result)=>{
            if(err) return reject(err);
            return resolve(result.rowCount>0)
        })
    })
}

module.exports = db;