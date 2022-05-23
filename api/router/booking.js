const express = require('express');
const router = express.Router();
const Auth = require('../../auth');
const Booking = require('../moudule/booking');
const Defaults = require('../../default');
const Wallet = require('../moudule/wallet')
const jwt = require('jsonwebtoken');


/**
 * Thêm 1 tài khoản thường
 * 
 * @permisson   Ai cũng có thể thực thi
 * @body        distance, total, start_point, end_point
 * @returns     400, 419, 216, 420
 */
router.post('/create', async (req, res, next) => {
    try {
        // kiem tra tien
        let distance = req.body.distance;
        let total = req.body.total;
        let start_point = req.body.start_point;
        let end_point = req.body.end_point;
        let token = req.body.token;
        let datas

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                datas = data;
            }
        })
        let id_account = datas.id_account;

        if (distance && total && start_point && end_point) {
            let balance = await Wallet.selectBalance(id_account);
            balance = balance.balance;
            if (balance >= total) {
                let existBooking = await Booking.hasBooking(id_account);
                if (existBooking) {
                    return res.json({
                        code: 419
                    })
                } else {
                    let create = await Booking.createBooking(id_account, distance, total, start_point, end_point, Defaults.noDriver);
                    return res.json({
                        code: 216
                    })
                }
            } else {
                return res.json({
                    code: 420
                })
            }

        } else {
            return res.json({
                code: 400
            })
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


module.exports = router;