const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Mailer = require('../../mail');
const router = express.Router();
const Account = require('../moudule/account');
const Auth = require('../../auth');
const Validation = require('../../validation');
const Defaults = require('../../default');
const isImageURL = require('image-url-validator').default;


/**
 * Thêm 1 tài khoản thường
 * 
 * @permisson   Ai cũng có thể thực thi
 * @body        username, password, first_name, 
 *              last_name, phone_number, day_of_birth, 
 *              address, gender, mail
 * @returns     400, 401, 402, 403, 404, 405, 407, 408, 409, 411
 */
router.post('/signup', async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let phone_number = req.body.phone_number;
        let day_of_birth = req.body.day_of_birth;
        let address = req.body.address;
        let gender = req.body.gender;
        let mail = req.body.mail;

        if (username && password && first_name && last_name && phone_number && day_of_birth && address && mail) {
            if (password.trim() == "") {
                return res.json({
                    code: 400
                })
            }

            if (password.length < Defaults.passwordLength) {
                return res.json({
                    code: 409
                })
            }

            if (!Validation.isDate(day_of_birth)) {
                return res.json({
                    code: 408
                })
            }

            if (!Validation.isValidAge(day_of_birth)) {
                return res.json({
                    code: 407
                })
            }

            if (!Validation.isGender(gender)) {
                return res.json({
                    code: 411
                })
            }

            let existMail = await Account.hasMail(mail);

            if (existMail) {
                return res.json({
                    code: 401
                })
            }
            else if (!Validation.isEmail(mail)) {
                return res.json({
                    code: 402
                })
            }

            let existPhoneNumber = await Account.hasPhoneNumber(phone_number);
            if (existPhoneNumber) {
                return res.json({
                    code: 403
                })
            }
            else if (!Validation.isPhoneNumber(phone_number)) {
                return res.json({
                    code: 404
                })
            }

            let existUsername = await Account.hasUsername(username);
            if (existUsername) {
                return res.json({
                    code: 405
                })
            }

            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                else {
                    password = hash;
                    let id_role = Defaults.roleCustomer;
                    let insert = await Account.insertCustomer(username, password, first_name, last_name, phone_number, day_of_birth, address, gender, mail, id_role, Defaults.image);
                    return res.json({
                        code: 201
                    });
                }
            })
        } else {
            res.json({
                code: 400
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something wrong'
        })
    }

});

/**
 * Đăng nhập 
 * @body        username, password
 * @returns     400, 406, 202
 */
router.post('/login', async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        if (!(username && password)) {
            return res.json({
                code: 400
            })
        }

        let isEmail = Validation.isEmail(username);
        if (isEmail) {
            let existMail = await Account.hasMail(username);
            if (existMail) {
                username = await Account.selectUsernameByEmail(username);
            }
        }
        let isPhoneNumber = Validation.isNumber(username);
        if (isPhoneNumber) {
            let existPhoneNumber = await Account.hasPhoneNumber(username);
            if (existPhoneNumber) {
                username = await Account.selectUsernameByPhone(username);
            }
        }

        let existUsername = await Account.hasUsername(username.toLowerCase());
        console.log(username)
        console.log(existUsername)
        if (existUsername) {
            // console.log(password)
            let encrypted_password = await Account.selectPassword(username);
            let match = await bcrypt.compare(password, encrypted_password.trim());
            if (match) {
                let person = await Account.selectByUsername(username);
                let id = person.id;
                let role = await Account.selectRoleByUsername(username);

                let invalid = 0;
                for (let ro of role) {
                    if (ro.is_active == false) invalid += 1;
                }

                if (invalid == role.length) {
                    return res.json({
                        code: 418
                    })
                } else {
                    let data = {
                        "id_account": id,
                        "username": username.trim(),
                        "role": role
                    }

                    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

                    return res.json({
                        code: 202,
                        accessToken: accessToken,
                        email: person.mail.trim(),
                        first_name: person.first_name.trim(),
                        last_name: person.last_name.trim(),
                        role: role
                    });
                }


            } else {
                return res.json({
                    code: 406
                });
            }
        } else {
            return res.json({
                code: 406
            });
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})


/**
 * Chỉnh sửa thông tin tài khoản của người dùng đã đăng nhập
 * 
 * @permisson   logined
 * @body        username, password, first_name, 
 *              last_name, phone_number, day_of_birth, 
 *              address, gender, mail, image
 * @returns     400, 409, 410, 203, 204, 205, 206, 405, 407, 408, 207, 208, 411, 209, 401, 201
 */
router.patch('/change_info', Auth.authenLogined, async (req, res, next) => {
    try {
        let new_password = req.body.new_password;
        let old_password = req.body.old_password;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let phone_number = req.body.phone_number;
        let day_of_birth = req.body.day_of_birth;
        let address = req.body.address;
        let gender = req.body.gender;
        let mail = req.body.mail;
        let image = req.body.image;

        let data = Auth.tokenData(req);
        let id_account = data.id_account;
        let username = data.username.trim();

        let fails = [];
        let successes = [];

        if (!((new_password && old_password) || first_name || last_name || phone_number || day_of_birth || address || gender || mail || image)) {
            return res.json({
                code: 400
            });
        }

        if (new_password) {
            if (new_password.length < 6) {
                return res.json({
                    code: 409
                })
            }
            let encrypted_password = await Account.selectPassword(username);
            let match = await bcrypt.compare(old_password, encrypted_password.trim());
            if (match) {
                successes.push(203);
                bcrypt.hash(new_password, saltRounds, async (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }
                    else {
                        new_password = hash;
                        let updatePassword = await Account.updatePasswordByUsername(username, new_password);

                    }
                })
            } else {
                fails.push(412);
            }
        }

        if (first_name) {
            let updateFirstname = await Account.updateFirstNameById(id_account, first_name);
            successes.push(204);
        }

        if (last_name) {
            let updateLastname = await Account.updateLastNameById(id_account, last_name);
            successes.push(205);
        }

        if (phone_number) {
            let existPhonenumber = await Account.hasPhoneNumber(phone_number);
            if (existPhonenumber) {
                fails.push(403);
            } else if (!Validation.isPhoneNumber(phone_number)) {
                fails.push(404);
            } else {
                let updatePhoneNumber = await Account.updatePhoneNumberById(id_account, phone_number);
                successes.push(206)
            }
        }

        if (day_of_birth) {
            if (!Validation.isDate(day_of_birth)) {
                fails.push(408);
            } else if (!Validation.isValidAge(day_of_birth)) {
                fails.push(407);
            } else {
                let updateDayOfBirth = await Account.updateDayOfBirthById(id_account, day_of_birth);
                successes.push(207);
            }
        }

        if (address) {
            let updateAdress = await Account.updateAdressById(id_account, address);
            successes.push(208);
        }

        if (gender) {
            if (!Validation.isGender(gender)) {
                fails.push(411);
            } else {
                let updateGender = await Account.updateGenderById(id_account, gender);
                successes.push(209);
            }

        }

        if (mail) {
            let existMail = await Account.hasMail(mail);
            if (existMail) {
                fails.push(401);
            } else {
                let updateMail = await Account.updateMailById(id_account, mail);
                successes.push(201);
            }
        }

        if (image) {
            let validImage = await await isImageURL(image);

            if (validImage) {
                successes.push(212);
            } else {
                fails.push(413);
            }
        }

        return res.json({
            fails: fails,
            successes: successes
        })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})

/**
 * Chức năng quên mật khẩu
 * 
 * @permisson   Ai cũng có thể thực thi
 * @body        username, code, new_password
 * @returns     409, 202, 415, 416, 400, 414, 213
 */
router.patch('/forgot_password', async (req, res, next) => {
    try {
        let username = req.body.username;
        let code = req.body.code;
        let new_password = req.body.new_password;

        let isEmail = Validation.isEmail(username);
        if (isEmail) {
            let existMail = await Account.hasMail(username);
            if (existMail) {
                username = await Account.selectUsernameByEmail(username);
            }
        }
        let isPhoneNumber = Validation.isNumber(username);
        if (isPhoneNumber) {
            let existPhoneNumber = await Account.hasPhoneNumber(username);
            if (existPhoneNumber) {
                username = await Account.selectUsernameByPhone(username);
            }
        }

        let existUsername = await Account.hasUsername(username);

        if (existUsername) {
            let person = await Account.selectByUsername(username)

            if (code && new_password) {
                if (code.length == Defaults.codeLength) {
                    if (new_password.length < Defaults.passwordLength) {
                        return res.json({
                            code: 409
                        })
                    }
                    let encryptedCode = person.code;
                    let match = await bcrypt.compare(code, encryptedCode.trim());
                    if (match) {
                        bcrypt.hash(new_password, saltRounds, async (err, hash) => {
                            if (err) {
                                console.log(err);
                                return res.sendStatus(500);
                            }
                            else {
                                let updatePassword = await Account.updatePasswordByUsername(username, hash);
                                let deleteCode = await Account.updateCodeByUsername(username, "");
                                let id = await person.id;
                                let role = await Account.selectRoleByUsername(username);
                                let data = {
                                    "id_account": id,
                                    "username": username.trim(),
                                    "role": role
                                }

                                const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

                                return res.json({
                                    code: 202,
                                    accessToken: accessToken
                                });
                            }
                        })
                    } else {
                        return res.json({
                            code: 416
                        })
                    }

                } else {
                    return res.json({
                        code: 415
                    })
                }

            } else if (code || new_password) {
                return res.json({
                    code: 400
                })
            } else {
                let code = await createCode();
                let email = person.mail;

                bcrypt.hash(code, saltRounds, async (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }
                    else {
                        let send = Mailer.sendVerification(email, code);
                        code = hash;
                        let saveCode = await Account.updateCodeByUsername(username, code);
                        let del = autoDeleteCode(username, code);
                        res.json({
                            code: 213,
                        })
                    }
                })
            }
        } else {
            return res.json({
                code: 414
            })
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})

/**
 * Xem thông tin của tài khoản
 * 
 * @permisson   Tài khoản đã đăng nhập
 * @query        info
 * @returns     400, 211
 * @regulation  first_name = 1, last_name=2, phone_number = 3, 
 *              day_of_birth = 4, address = 5, image = 9,
 *              gender = 6, mail = 7, username = 8, balance = b
 */
router.get('/information', async (req, res, next) => {
    try {
        let info = req.query.info;
        let email = req.require.email;
        let username = await Account.selectUsernameByEmail(email);

        // let id_account = Auth.tokenData(req).id_account;

        let person = await Account.selectByUsername(username);
        let data = {};

        if (!info) {
            return res.json({
                code: 400
            })
        }

        // first_name
        if (info.indexOf('1') > -1) {
            data.first_name = person.first_name;
        }

        // last_name
        if (info.indexOf('2') > -1) {
            data.last_name = person.last_name;
        }

        //phone_number
        if (info.indexOf('3') > -1) {
            data.phone_number = person.phone_number;
        }

        // day_of_birth
        if (info.indexOf('4') > -1) {
            data.day_of_birth = person.date;
        }

        // address
        if (info.indexOf('5') > -1) {
            data.address = person.address;
        }

        // gender
        if (info.indexOf('6') > -1) {
            data.gender = person.gender;
        }

        // mail
        if (info.indexOf('7') > -1) {
            data.mail = person.mail.trim();
        }

        // username
        if (info.indexOf('8') > -1) {
            data.username = Auth.tokenData(req).username;
        }

        // image
        if (info.indexOf('9') > -1) {
            data.image = person.image;
        }

        // balance
        if (info.indexOf('b') > -1) {
            data.balance = person.balance;
        }

        data.code = 211;

        return res.json(data);


    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})

/**
 * Yêu cầu trở thành tài xế
 * 
 * @permisson   đã đăng nhập
 * @body        driving_license, number_plate, id_transport_detail, 
 * @returns     417, 214
 */
router.post('/to_driver', Auth.authenLogined, async (req, res, next) => {
    try {
        let driving_license = req.body.driving_license;
        let number_plate = req.body.number_plate;
        let id_transport_detail = req.body.id_transport_detail;

        if (driving_license && number_plate && id_transport_detail) {
            let username = Auth.tokenData(req).username;
            let roles = await Account.selectRoleByUsername(username);

            for (let role of roles) {
                if (role.id_role == 3) {
                    return res.json({
                        code: 417
                    })
                }
            }


            let id_driver = Auth.tokenData(req).id_account;
            let create = await Account.insertDriver(driving_license, number_plate, id_transport_detail, id_driver, username);
            return res.json({
                code: 214
            })
        } else {
            return res.json({code: 400})
        }




    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})

/**
 * Thêm 1 tài khoản thường
 * 
 * @permisson   Ai cũng có thể thực thi
 * @body        username, password, first_name, 
 *              last_name, phone_number, day_of_birth, 
 *              address, gender, mail
 * @returns     400, 401, 402, 403, 404, 405, 407, 408, 409, 411
 */
// router.('', async (req, res, next) => {
//     try{

//     }catch(err){
//         console.log(err);
//         return res.sendStatus(500);
//     }
// })

async function deleteCode(username, code) {
    let person = await Account.selectByUsername(username);
    let realCode = person.code;
    if (realCode.trim() == code.trim()) {
        console.log("vo day")
        let deleteCode = await Account.updateCodeByUsername(username, "");
    }
}

async function autoDeleteCode(username, code) {
    setTimeout(deleteCode, Defaults.codeValid, username, code);
}

async function createCode() {
    var result = '';
    for (var i = 0; i < Defaults.codeLength; i++) {
        result += String(Math.floor(Math.random() * 10));
    }
    return result;
}

module.exports = router;