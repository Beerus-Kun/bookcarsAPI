const express = require('express');
const router = express.Router();
const Auth = require('../../auth');
const Transport = require('../moudule/transport');


/**
 * Thêm 1 tài khoản thường
 * 
 * @permisson   Ai cũng có thể thực thi
 * @returns     215
 */
router.get('/price', async (req, res, next) => {
    try{
        // kiem tra tien
        let price = await Transport.selectTransportDetail();
        return res.json({
            code: 215,
            motor: price[0].price,
            car: price[1].price
        })

    }catch(err){
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